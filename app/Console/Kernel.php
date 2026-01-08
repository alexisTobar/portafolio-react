protected function schedule(Schedule $schedule): void
{
    // Ejecuta el ping cada 10 minutos
    $schedule->command('app:self-ping')->everyTenMinutes();
}