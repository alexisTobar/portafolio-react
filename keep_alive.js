// keep_alive.js
const https = require('https');

const URL = 'https://tu-proyecto.onrender.com'; // Aquí irá tu URL de Render

setInterval(() => {
    https.get(URL, (res) => {
        console.log(`Ping enviado a ${URL} - Estado: ${res.statusCode}`);
    }).on('error', (e) => {
        console.error(`Error en el ping: ${e.message}`);
    });
}, 10 * 60 * 1000); // Cada 10 minutos