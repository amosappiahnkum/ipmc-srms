<?php

use App\Models\AllPrograms;
use App\Models\Duration;
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
        Schema::create('subjects', static function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Program::class);
            $table->string('name');
            $table->foreignIdFor(Duration::class);
            $table->integer('contact_hours')->default(2)->nullable();
            $table->string('year')->nullable();
            $table->integer('semester')->nullable();
            $table->string('code', 20);
            $table->foreignIdFor(User::class);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('subjects');
    }
};
