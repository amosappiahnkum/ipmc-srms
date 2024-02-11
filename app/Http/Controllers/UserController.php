<?php

namespace App\Http\Controllers;


use App\Http\Resources\UserResource;
use App\Imports\VoterImport;
use App\Models\User;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Display a listing of the resource.
     *
     * @return
     */
    public function index()
    {
        return UserResource::collection(User::withTrashed()->whereHas('activeRoles', function ($q) {
            $q->where('name', 'Admin')->orWhere('name', 'EC')->orWhere('name', 'Agent');
        })->get());
    }

    public function getActiveRoles(): JsonResponse|array
    {
        $loggedInUser = Auth::user();

        if (!$loggedInUser) {
            return response()->json([
                'message' => 'Unauthenticated'
            ], 422);
        }

        return [
            'user' => new UserResource($loggedInUser),
            'roles' => $loggedInUser->getRoleNames(),
            'permissions' => $loggedInUser->getPermissionsViaRoles()->pluck('name')->merge($loggedInUser->getDirectPermissions()->pluck('name')),
            'staff_id' => $loggedInUser->userable_id
        ];
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     *
     * @return Response
     * @throws Exception
     */
    public function store(Request $request): Response
    {
        $username = $request->first_name . '.' . $request->last_name;
        $checkUsername = User::where('username', $username)->count();

        if ($checkUsername >= 1) {
            $username = $username . '_' . random_int(10, 150);
        }
        DB::beginTransaction();
        $request['username'] = strtolower($username);
        $request['password'] = Hash::make(strtolower($username));
        try {
            $user = User::create($request->all());
            $role = Role::where('name', 'Admin')->first();
            DB::commit();

            return \response(new UserResource($user));
        } catch (Exception $exception) {
            DB::rollBack();

            return \response('Something went wrong', 422);
        }
    }

    public function getUserRoles($id): array
    {
        $userRoles = User::find($id)->roles;
        $otherRoles = Role::whereNotIn('id', $userRoles->pluck('pivot.roleId'))->get();

        return [$userRoles, $otherRoles];
    }

    public function changePassword(Request $request)
    {
        $this->validate($request, [
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);

        DB::beginTransaction();
        $user = Auth::user();
        if (!$user) {
            return response()->json([
                'message' => 'User not found'
            ], 400);
        }
        try {
            if (!Hash::check($request['currentPassword'], $user->password)) {
                return response()->json([
                    'message' => 'Current Password is incorrect'
                ], 400);
            }

            if (Hash::check($request['password'], $user->password)) {
                return response()->json([
                    'message' => 'New Password is the same as current'
                ], 400);
            }

            $user->update([
                'password' => Hash::make($request->password),
                'password_changed' => true,
            ]);

            DB::commit();
            return [$user->only(['id', 'name', 'username', 'password_changed']), []];
        } catch (Exception $exception) {

            Log::error('change-password', [$exception]);
            DB::rollBack();
            return response()->json([
                'message' => 'Something went wrong!'
            ], 400);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param  $id
     *
     * @return JsonResponse|Response
     */
    public function update(Request $request, $id)
    {
        DB::beginTransaction();
        try {
            User::find($id)->update($request->all());
            DB::commit();

            $user = User::find($id);

            return \response(new UserResource($user));
        } catch (Exception $exception) {
            DB::rollBack();

            return response('Something went wrong', 422);
        }
    }
}
