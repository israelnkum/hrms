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
        Schema::create('information_updates', static function (Blueprint $table) {
            $table->id();
            $table->morphs('information');
            $table->jsonb('old_info');
            $table->jsonb('new_info');
            $table->string('status');
            $table->date('status_changed_date')->nullable();
            $table->foreignIdFor(User::class, 'status_changed_by')->nullable()->constrained('users');
            $table->foreignIdFor(User::class, 'requested_by')->constrained('users');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down(): void
    {
        Schema::dropIfExists('information_updates');
    }
};
