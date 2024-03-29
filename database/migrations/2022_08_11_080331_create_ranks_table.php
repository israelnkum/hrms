<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(): void
    {
        Schema::create('ranks', static function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->boolean('teaching')->default(false);
            $table->boolean('non-teaching')->default(false);
            $table->boolean('senior_members')->default(false);
            $table->boolean('senior_staff')->default(false);
            $table->boolean('junior_staff')->default(false);
            $table->boolean('analogous')->default(false);
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('ranks');
    }
};
