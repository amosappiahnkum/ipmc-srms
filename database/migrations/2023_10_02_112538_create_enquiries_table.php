<?php

use App\Models\Branch;
use App\Models\Program;
use App\Models\Student;
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
        Schema::create('enquiries', static function (Blueprint $table) {
            $table->id();
            $table->uuid();
            $table->foreignIdFor(Student::class);
            $table->jsonb('programs');
            $table->text('other_program')->nullable();
            $table->jsonb('preferred_timings')->nullable();
            $table->text('other_preferred_timing')->nullable();
            $table->jsonb('heard')->comment('heard about ipmc')->nullable();
            $table->text('other_heard')->comment('heard about ipmc')->nullable();
            $table->string('school_name')->nullable();
            $table->foreignIdFor(User::class, 'evaluated_by')->nullable();
            $table->date('evaluation_date')->nullable();
            $table->foreignIdFor(Branch::class)->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('enquiries');
    }
};
