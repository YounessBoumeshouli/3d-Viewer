<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    
    public function up(): void
    {
        Schema::create('houses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('dxf_file_id')->constrained()->onDelete('cascade');
            $table->foreignId('designer_id')->constrained()->onDelete('cascade');
            $table->integer('stage');
            $table->double('size')->default(0);
            $table->string('token')->unique();
            $table->string('thumbnail')->default("thumbnails/default");
            $table->timestamps();
        });
        Schema::create('house_components', function (Blueprint $table) {
            $table->id();
            $table->foreignId('house_id');
            $table->foreignId('component_id');
            $table->timestamps();
        });
    }

    
    public function down(): void
    {
        Schema::dropIfExists('houses');
        Schema::dropIfExists('house_components');
    }
};
