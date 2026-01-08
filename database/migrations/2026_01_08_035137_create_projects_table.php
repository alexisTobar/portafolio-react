<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void {
    Schema::create('projects', function (Blueprint $table) {
        $table->id();
        $table->string('titulo');
        $table->text('descripcion'); // Usamos text por si la descripción es larga
        $table->string('imagen')->nullable();
        $table->string('link')->nullable();
        $table->string('stack');
        $table->timestamps();
    });
}



    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
