const sql = require('mssql');
require('dotenv').config();

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER, 
    database: process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT),
    options: {
        encrypt: false, 
        enableArithAbort: true,
        trustServerCertificate: true
    },
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    }
};

const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log(`✅ Conectado a SQL Server en puerto ${config.port}`);
        return pool;
    })
    .catch(err => {
        console.error('❌ Error de conexión a Base de Datos:', err);
        process.exit(1);
    });

module.exports = {
    sql,
    poolPromise
};