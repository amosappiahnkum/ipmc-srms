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
use Maatwebsite\Excel\Facades\Excel;
use Spatie\Permission\Models\Role;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

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

    public function getActiveRoles()
    {
        $loggedInUser = Auth::user();

        if (!$loggedInUser) {
            return response()->json([
                'message' => 'Unauthenticated'
            ], 422);
        }

        return [
            'user' => $loggedInUser->only(['id', 'name', 'username']),
            'roles' => $loggedInUser->getRoleNames(),
            'permissions' => $loggedInUser->getPermissionsViaRoles()->pluck('name')->merge
            ($loggedInUser->getDirectPermissions()->pluck('name')),
            'employee_id' =>  null
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

    public function getUserRoles($id): array
    {
        $userRoles = User::find($id)->roles;
        $otherRoles = Role::whereNotIn('id', $userRoles->pluck('pivot.roleId'))->get();

        return [$userRoles, $otherRoles];
    }
}
