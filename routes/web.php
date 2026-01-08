<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProyectoController; 
use App\Models\Proyecto;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// --- RUTA PÚBLICA (WELCOME) ---
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'listaProyectos' => Proyecto::orderBy('created_at', 'desc')->get(),
        'listaServicios' => [], 
        'puedeIniciarSesion' => Route::has('login'),
        'puedeRegistrarse' => Route::has('register'),
    ]);
});

// --- RUTAS PROTEGIDAS (ADMIN) ---
Route::middleware(['auth', 'verified'])->group(function () {
    
    // Vista del Panel de Control
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard', [
            'proyectos' => Proyecto::orderBy('created_at', 'desc')->get(),
        ]);
    })->name('dashboard');

    // CRUD DE PROYECTOS
    Route::post('/proyectos', [ProyectoController::class, 'store'])->name('proyectos.store');
    Route::put('/proyectos/{proyecto}', [ProyectoController::class, 'update'])->name('proyectos.update');
    Route::delete('/proyectos/{proyecto}', [ProyectoController::class, 'destroy'])->name('proyectos.destroy');

    // Rutas de Perfil
    Route::get('/perfil', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/perfil', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/perfil', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';