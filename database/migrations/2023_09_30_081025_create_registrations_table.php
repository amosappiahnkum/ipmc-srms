<?php

use App\Models\Branch;
use App\Models\OngoingProgram;
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
        Schema::create('registrations', static function (Blueprint $table) {
            $table->id();
            $table->uuid();
            $table->foreignIdFor(Student::class);
            $table->foreignIdFor(OngoingProgram::class);
            $table->decimal('total_course_fee');
            $table->decimal('registration_fee')->nullable();
            $table->decimal('discounted_fee')->nullable();
            $table->decimal('net_payable_fee')->nullable();
            $table->string('status');
            $table->foreignIdFor(Branch::class);
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('registrations');
    }
};
