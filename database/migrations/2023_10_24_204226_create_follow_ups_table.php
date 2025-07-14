<?php

use App\Models\Enquiry;
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
        Schema::create('follow_ups', static function (Blueprint $table) {
            $table->id();
            $table->uuid();
            $table->date('follow_up_date');
            $table->string('mode', 50);
            $table->longText('feedback');
            $table->foreignIdFor(User::class);
            $table->foreignIdFor(Enquiry::class);
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('follow_ups');
    }
};
