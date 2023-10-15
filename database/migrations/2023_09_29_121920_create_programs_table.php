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
