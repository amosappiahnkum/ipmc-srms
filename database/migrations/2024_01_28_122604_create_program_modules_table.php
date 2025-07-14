<?php

use App\Models\Duration;
use App\Models\Module;
use App\Models\Program;
use App\Models\User;
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
        Schema::create('program_modules', static function (Blueprint $table) {
            $table->id();
            $table->uuid();
            $table->foreignIdFor(Module::class);
            $table->foreignIdFor(Program::class);
            $table->foreignIdFor(Duration::class);
            $table->integer('contact_hours')->default(2)->nullable();
            $table->string('year')->nullable();
            $table->integer('semester')->nullable();
            $table->foreignIdFor(User::class);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('program_modules');
    }
};
