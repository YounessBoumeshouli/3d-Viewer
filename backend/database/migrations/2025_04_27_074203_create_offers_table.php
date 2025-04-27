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
        Schema::create('offers', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description');
            $table->enum('type',["OneYear","ThreeMonths","SixMonths","None"])->default('None');
            $table->float('price')->nullable();
            $table->timestamps();
        });
        Schema::create('user_offers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('offer_id');
            $table->foreignId('designer_id');
            $table->time('start_date');
            $table->time('end_date');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('offers');
        Schema::dropIfExists('user_offers');
    }
};
