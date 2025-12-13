const app = require('./app');
require('dotenv').config();

// Inicializar conexion a BD antes de levantar el servidor
require('./config/database'); 

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en puerto ${PORT} en modo ${process.env.NODE_ENV}`);
});

// Manejo de errores no capturados
process.on('unhandledRejection', (err) => {
    console.error('UNHANDLED REJECTION! 💥 Cerrando servidor...');
    console.error(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});