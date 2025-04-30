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
            $table->integer('storage')->default(100);
            $table->integer('models')->default(3);
            $table->timestamps();
        });
        Schema::create('user_offers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('offer_id');
            $table->foreignId('designer_id');
            $table->timestamp('start_date');
            $table->timestamp('end_date');
            $table->enum('paymentStatus',['none','paid'])->default('none');
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
