<?php

namespace App\Helpers;

use App\Models\QuestionBank;
use App\Models\Student;
use App\Models\User;
use Carbon\Carbon;
use Exception;
use Illuminate\Support\Facades\Log;

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

    /**
     * @param int $subjectId
     * @param int $total
     * @return array
     */
    public static function getQuestions(int $subjectId, int $total): array
    {
        $questions = QuestionBank::query()->where('module_id', $subjectId)
            ->inRandomOrder()->limit($total)->get();

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

    /**
     * @param string $programCode
     * @return string
     */
    public function generateStudentId(string $programCode): string
    {

            $lastStudentRecord = Student::query()->latest('id')->first();
            if (empty($lastStudentRecord)) {
                return $programCode . '001';
            }

                $lastStaffIdNumber = (int)substr($lastStudentRecord->student_id, strlen($programCode));
                $std_num = $lastStaffIdNumber + 1;
                if ($lastStaffIdNumber < 9) {
                    $studentId = $programCode . "00" . $std_num;
                } elseif ($lastStaffIdNumber < 99) {
                    $studentId = $programCode . "0" . $std_num;
                } else {
                    $studentId = $programCode . $std_num;
                }

        return $studentId;
    }

    /**
     * @return string
     */
    public static function generateStudentNumber(): string
    {
        $prefix = date('Y');

        $lastStudent = Student::query()->latest('id')->first();

        if (empty($lastStudent)) {
           return $prefix . '001';
        }

        return $lastStudent->student_number + 1;
    }
}
