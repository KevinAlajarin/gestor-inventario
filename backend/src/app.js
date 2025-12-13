const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const productRoutes = require('./routes/productRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Middlewares Globales
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Rutas
app.use('/api/products', productRoutes);

// Manejo de rutas no encontradas
app.all('*', (req, res, next) => {
    res.status(404).json({ status: 'fail', message: `No se encuentra ${req.originalUrl}` });
});

// Middleware Centralizado de Errores
app.use(errorHandler);

module.exports = app;