module.exports = (err, req, res, next) => {
    console.error('🔥 Error Stack:', err.stack);

    const statusCode = err.statusCode || 500;
    const message = err.message || 'Error Interno del Servidor';

    res.status(statusCode).json({
        status: 'error',
        statusCode,
        message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
};