<?php

use App\Models\Sponsor;
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
        Schema::create('students', static function (Blueprint $table) {
            $table->id();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('other_name')->nullable();
            $table->string('phone_number');
            $table->date('dob')->nullable();
            $table->string('country')->nullable();
            $table->string('nationality')->nullable();
            $table->string('gender');
            $table->string('alt_phone_number')->nullable();
            $table->string('email')->nullable();
            $table->text('address')->nullable();
            $table->string('box_address', 200)->nullable();
            $table->string('house_number')->nullable();
            $table->string('digital_address')->nullable();
            $table->string('id_type', 30)->nullable();
            $table->string('id_number', 30)->nullable();
            $table->jsonb('education_qualifications')->nullable();
            $table->text('other_qualification')->nullable();
            $table->string('status')->default('enquiry');
            $table->foreignIdFor(Sponsor::class);
            $table->foreignIdFor(User::class)->comment('added by')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('students');
    }
};
