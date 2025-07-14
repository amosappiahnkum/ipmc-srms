<?php

use App\Models\Module;
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
        Schema::create('question_banks', static function (Blueprint $table) {
            $table->id();
            $table->uuid();
            $table->foreignIdFor(Module::class);
            $table->longText('text')->unique();
            $table->enum('type', ['single', 'multi', 'essay']);
            $table->jsonb('answers')->nullable();
            $table->longText('correct_answer')->nullable();
            $table->integer('mark')->nullable()->default(1);
            $table->boolean('timed')->nullable()->default(false);
            $table->string('time')->nullable()->comment('in-minutes');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('question_banks');
    }
};
