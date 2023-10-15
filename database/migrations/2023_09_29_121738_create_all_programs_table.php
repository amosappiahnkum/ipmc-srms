<?php

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
        Schema::create('all_programs', static function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('fee', 20);
            $table->string('registration_fee', 20);
            $table->string('total_fee', 20);
            $table->string('type');
            $table->integer('installments')->default(0)->comment('number of installments');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('all_programs');
    }
};
