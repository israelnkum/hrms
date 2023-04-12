<?php

use App\Models\EducationLevel;
use App\Models\Employee;
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
        Schema::create('education', static function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Employee::class)->constrained();
            $table->foreignIdFor(EducationLevel::class)->constrained();
            $table->string('institution');
            $table->string('qualification');
            $table->date('date');
            $table->enum('type', ['professional', 'academic'])->default('academic');
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
        Schema::dropIfExists('education');
    }
};
