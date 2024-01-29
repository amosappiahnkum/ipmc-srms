<?php

use App\Models\Exam;
use App\Models\Student;
use App\Models\Module;
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
            $table->id();
            $table->integer('current_question');
            $table->foreignIdFor(Student::class);
            $table->foreignIdFor(Exam::class);
            $table->foreignIdFor(Module::class);
            $table->integer('total_questions');
            $table->integer('total_mark');
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
