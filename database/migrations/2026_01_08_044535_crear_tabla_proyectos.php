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
    Schema::create('proyectos', function (Blueprint $table) {
        $table->id();
        $table->string('titulo');
        $table->string('tecnologias'); 
        $table->text('descripcion');
        $table->string('imagen_url')->nullable();
        $table->string('link_proyecto')->nullable(); 
        $table->timestamps();
    });
}

public function down(): void
{
    Schema::dropIfExists('proyectos');
}

    /**
     * Reverse the migrations.
     */
    
};
