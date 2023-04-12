<?php

use App\Models\Employee;
use App\Models\User;
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
        Schema::create('dependants', static function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Employee::class)->constrained();
            $table->string('name');
            $table->string('relationship');
            $table->string('phone_number')->nullable();
            $table->string('alt_phone_number')->nullable();
            $table->string('dob')->nullable();
            $table->foreignIdFor(User::class)->constrained();
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
        Schema::dropIfExists('dependants');
    }
};
