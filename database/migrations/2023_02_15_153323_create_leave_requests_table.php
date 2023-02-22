<?php

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
    public function up()
    {
        Schema::create('leave_requests', static function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Employee::class);
            $table->decimal('days_requested');
            $table->date('start_date');
            $table->date('end_date');
            $table->enum('status', ['pending', 'rejected', 'approved', 'cancelled']);
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
        Schema::dropIfExists('leave_requests');
    }
};
