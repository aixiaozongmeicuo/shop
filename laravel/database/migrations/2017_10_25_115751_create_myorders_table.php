<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMyordersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('myorders', function (Blueprint $table) {
            $table->increments('id');
            $table->timestamps();
            $table->string("ordernumber");
            $table->string("total");
            $table->string("recaddress");
            $table->string("userid");
            $table->string("status");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('myorders');
    }
}
