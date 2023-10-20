<?php

use App\Enums\ProgramType;
use App\Models\AllPrograms;
use App\Models\Duration;
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
        Schema::create('programs', static function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(AllPrograms::class);
            $table->foreignIdFor(Duration::class);
            $table->string('year')->nullable();
            $table->string('fee', 20);
            $table->string('registration_fee', 20);
            $table->string('total_fee', 20);
            $table->string('program_code', 20);
            $table->integer('installments')->default(0)->comment('number of installments');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('programs');
    }
};
