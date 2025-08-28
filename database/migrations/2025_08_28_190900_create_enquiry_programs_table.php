<?php

use App\Models\Enquiry;
use App\Models\Program;
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
        Schema::create('enquiry_programs', function (Blueprint $table) {
            $table->id();
            $table->uuid();
            $table->foreignIdFor(Enquiry::class)->constrained();
            $table->foreignIdFor(Program::class)->constrained();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('enquiry_programs');
    }
};
