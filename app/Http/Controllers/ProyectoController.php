<?php

namespace App\Http\Controllers;

use App\Models\Proyecto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

class ProyectoController extends Controller
{
    // GUARDAR
    public function store(Request $request)
    {
        $datosValidados = $request->validate([
            'titulo'        => 'required|string|max:255',
            'tecnologias'   => 'required|string',
            'descripcion'   => 'required|string',
            'imagen_url'    => 'nullable|url',
            'link_proyecto' => 'nullable|url',
            'link_github'   => 'nullable|url',
        ]);

        Proyecto::create($datosValidados);
        return Redirect::route('dashboard')->with('message', '¡Proyecto creado!');
    }

    // ACTUALIZAR
    public function update(Request $request, Proyecto $proyecto)
    {
        $datosValidados = $request->validate([
            'titulo'        => 'required|string|max:255',
            'tecnologias'   => 'required|string',
            'descripcion'   => 'required|string',
            'imagen_url'    => 'nullable|url',
            'link_proyecto' => 'nullable|url',
            'link_github'   => 'nullable|url',
        ]);

        $proyecto->update($datosValidados);
        return Redirect::route('dashboard')->with('message', '¡Proyecto actualizado!');
    }

    // ELIMINAR
    public function destroy(Proyecto $proyecto)
    {
        $proyecto->delete();
        return Redirect::route('dashboard')->with('message', 'Proyecto eliminado');
    }
}