<?php

use App\Models\OngoingProgram;
use App\Models\Module;
use App\Models\ProgramModule;
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
        Schema::create('regular_exams', static function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('exam_code');
            $table->foreignIdFor(OngoingProgram::class);
            $table->foreignIdFor(ProgramModule::class);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('regular_exams');
    }
};
