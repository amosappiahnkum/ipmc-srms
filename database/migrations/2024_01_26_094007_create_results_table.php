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
            $table->uuid('id')->primary();
            $table->uuidMorphs('examable');
            $table->integer('current_question')->nullable();
            $table->foreignIdFor(Student::class);
            $table->foreignIdFor(ProgramModule::class);
            $table->integer('total_questions');
            $table->integer('attendance_score')->default(0);
            $table->integer('class_score')->default(0);
            $table->integer('exam_score')->default(0);
            $table->integer('total_mark')->default(0);
            $table->jsonb('key_strokes')->nullable();
            $table->string('time_left')->comment('in-seconds');
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
