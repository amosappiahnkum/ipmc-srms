<?php

use App\Models\Instructor;
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
        Schema::create('ongoing_programs', static function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Program::class);
            $table->foreignIdFor(Instructor::class)->nullable();
            $table->time('batch_time');
            $table->date('start_date');
            $table->date('end_date');
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
        Schema::dropIfExists('ongoing_programs');
    }
};
