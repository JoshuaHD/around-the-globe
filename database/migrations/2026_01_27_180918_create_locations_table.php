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
        Schema::create('locations', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable();
            $table->string('city')->nullable();
            $table->string('country')->nullable();
            $table->string('iata')->nullable()->unique();
            $table->string('icao')->nullable()->unique();
            $table->double('lat')->nullable();
            $table->double('lng')->nullable();
            $table->double('alt')->nullable();
            $table->double('timezone')->nullable();
            $table->string('dst')->nullable();
            $table->string('tz')->nullable();
            $table->string('type')->nullable();
            $table->string('source')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('locations');
    }
};
