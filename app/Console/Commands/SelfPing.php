<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;

class SelfPing extends Command
{
    protected $signature = 'app:self-ping';
    protected $description = 'Evita que el servidor se duerma';

    public function handle()
    {
        // Esto hace que la web se visite a sí misma
        $url = config('app.url');
        Http::get($url);
        $this->info("Ping enviado a: " . $url);
    }
}