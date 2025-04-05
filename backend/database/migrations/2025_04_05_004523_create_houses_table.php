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
        Schema::create('houses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('dxf_file_id');
            $table->timestamps();
        });
        Schema::create('house_comoponents', function (Blueprint $table) {
            $table->id();
            $table->foreignId('house_id');
            $table->foreignId('component_id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('houses');
        Schema::dropIfExists('house_comoponents');
    }
};
