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
    public function up()
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('userId')->constrained('users');
            $table->string('todayDate');
            $table->string('scheduleBefore')->comment('今日の作業予定');
            $table->string('scheduleAfter')->comment('明日の作業予定');
            $table->string('content')->comment('今日行った作業内容');
            $table->string('remaingTaskBefore')->comment('作業前時点での残タスク');
            $table->string('remaingTaskAfter')->comment('作業後時点での残タスク');
            $table->string('impression')->comment('所感');
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
        Schema::dropIfExists('tasks');
    }
};