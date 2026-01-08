<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Proyecto extends Model
{
    // Nombre de la tabla
    protected $table = 'proyectos';

    // Lista de campos que permitimos guardar masivamente
    protected $fillable = [
        'titulo',
        'tecnologias',
        'descripcion',
        'imagen_url',
        'link_proyecto',
        'link_github',
    ];
}