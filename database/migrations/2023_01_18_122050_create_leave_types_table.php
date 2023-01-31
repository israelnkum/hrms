<?php

use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(): void
    {
        Schema::create('leave_types', static function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->longText('description')->nullable();
            $table->enum('entitlement_type', ['fixed', 'custom']);
            $table->integer('number_of_days')->default(0);
            $table->date('start_of_annual_cycle');
            $table->boolean('allow_half_day')->default(false);
            $table->boolean('allow_carry_forward')->default(false);
            $table->integer('maximum_allotment')->nullable();
            $table->integer('maximum_consecutive_days')->nullable();
            $table->integer('should_request_before')->nullable();
            $table->foreignIdFor(User::class);
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
        Schema::dropIfExists('leave_types');
    }
};
