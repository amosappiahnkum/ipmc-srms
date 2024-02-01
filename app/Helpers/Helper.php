<?php

namespace App\Helpers;

use App\Models\QuestionBank;
use App\Models\User;
use Carbon\Carbon;
use Exception;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Spatie\Permission\Models\Role;

class Helper
{
    public static function saveImage($model, $file, $directory): void
    {
        $image_name = uniqid() . '.' . $file->getClientOriginalExtension();
        $file->storeAs(env('APP_PHOTO_PATH') . '/' . $directory . '/', $image_name);
        $model->photo()->updateOrCreate(['photoable_id' => $model->id], [
            'file_name' => $image_name
        ]);
    }

    public static function createUserAccount($model, $data, $userName = null): void
    {
        $password = strtoupper(Str::random(10));
        $user = $model::find($data['id'])->user()->updateOrCreate(
            ['username' => $data['email']],
            [
                'username' => $data['email'],
                'first_name' => $data['first_name'],
                'last_name' => $data['last_name'],
                'email' => $data['email'],
                'password' => Hash::make($password),
                'default_password' => $password,
            ]
        );

        $role = Role::where('name', 'Staff')->first();

        $user->roles()->attach($role->id);
    }

    public static function formatDate($request)
    {
        if ($request->date !== 'null') {
            $explode = explode(',', $request->date);
            $request['start_date'] = Carbon::parse($explode[1])->format('Y-m-d');
            $request['end_date'] = Carbon::parse($explode[3])->format('Y-m-d');
        }

        return $request->all();
    }

    public static function getDate($date, $weeks, $start)
    {
        $endDate = Carbon::parse($date)->addWeekday()->addRealWeeks($weeks)->format('d-m-Y');
        $examDate = Carbon::parse($endDate)->addWeekday()->format('d-m-Y');

        return [
            'end' => $endDate . ' - ' . Carbon::parse($date)->diffInWeeks(Carbon::parse($endDate)),
            'exam' => $examDate,
            'week' => $weeks
        ];
    }

    /**
     * @param $firstName
     * @param $lastName
     * @return string
     * @throws Exception
     */
    public static function createUserName($firstName, $lastName): string
    {
        $username = strtolower($firstName) . '.' . strtolower(str_replace(' ', '_', $lastName));

        $checkUsername = User::query()->where('username', $username)->count();

        if ($checkUsername >= 1) {
            $username .= '_' . random_int(10, 150);
        }

        return $username;
    }

    /**
     * @param string $duration
     * @return int
     */
    public static function timeInMinutes(string $duration): int
    {
        $base = Carbon::now();
        $modified = $base->copy()->modify($duration);

        return $base->diffInSeconds($modified);
    }

    public static function getQuestions(int $subjectId, int $total): array
    {
        $questions = QuestionBank::query()->where('module_id', $subjectId)
            ->inRandomOrder()->limit($total)->get();

        Log::info('qu', [$questions]);

        return [
            'questions' => $questions->map(function ($item) {
                return [
                    'id' => $item->id,
                    'text' => $item->text,
                    'options' => json_decode($item->answers, false, 512, JSON_THROW_ON_ERROR),
                    'type' => $item->type,
                    'mark' => $item->mark,
                    'timed' => $item->timed,
                    'time' => $item->time,
                ];
            }),
            'answers' => $questions->map(function ($item) {
                return [
                    'id' => $item->id,
                    'answer' => $item->correct_answer
                ];
            })
        ];
    }
}
