<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMyorderListsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('myorder_lists', function (Blueprint $table) {
            $table->increments('id');
            $table->timestamps();
            $table->string("myorder_id");
            $table->string("goodsnum");
            $table->string("goodsprice");
            $table->string("huopin_id");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('myorder_lists');
    }
}
