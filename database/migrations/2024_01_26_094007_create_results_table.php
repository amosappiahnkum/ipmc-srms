<?php

use App\Models\Exam;
use App\Models\ProgramModule;
use App\Models\Student;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('results', static function (Blueprint $table) {
            $table->uuid();
            $table->integer('current_question')->nullable();
            $table->foreignIdFor(Student::class);
            $table->foreignIdFor(ProgramModule::class);
            $table->foreignUuid('exam_id');
            $table->integer('total_questions');
            $table->integer('total_mark');
            $table->jsonb('key_strokes')->nullable();
            $table->string('time_left')->comment('in-minutes');
            $table->integer('mark');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('results');
    }
};
