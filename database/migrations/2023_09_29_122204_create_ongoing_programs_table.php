<?php

use App\Enums\BatchStatus;
use App\Models\Branch;
use App\Models\Staff;
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
            $table->uuid();
            $table->foreignIdFor(Program::class);
            $table->foreignIdFor(Staff::class)->nullable();
            $table->time('batch_time')->nullable();
            $table->date('start_date')->nullable();
            $table->date('end_date')->nullable();
            $table->string('room')->nullable();
            $table->string('status')->default(BatchStatus::PENDING)->nullable();
            $table->foreignIdFor(User::class);
            $table->foreignIdFor(Branch::class);
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
