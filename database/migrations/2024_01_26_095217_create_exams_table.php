<?php

use App\Models\OngoingProgram;
use App\Models\ProgramModule;
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
        Schema::create('exams', static function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignIdFor(ProgramModule::class);
            $table->foreignIdFor(OngoingProgram::class);
            $table->uuidMorphs('examable');
            $table->jsonb('questions');
            $table->longText('answer');
            $table->date('date');
            $table->time('time');
            $table->string('duration')->comment('in-seconds');
            $table->boolean('shuffle')->nullable()->default(true)->comment('shuffle questions');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('exams');
    }
};
