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
        Schema::create('designers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id');
            $table->text('bio')->nullable();
            $table->text('avatar')->nullable();
            $table->timestamps();
        });
        Schema::create('designer_social_links', function (Blueprint $table) {
            $table->id();
            $table->foreignId('designer_id');
            $table->string('platform')->nullable();
            $table->text('url')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('designers');
    }
};
