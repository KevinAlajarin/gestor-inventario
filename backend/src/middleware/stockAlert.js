module.exports = (req, res, next) => {
    const { stock, name } = req.body;
    const threshold = parseInt(process.env.STOCK_THRESHOLD) || 10;

    // Ejecutar despues de la respuesta exitosa 
    res.on('finish', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
            if (stock !== undefined && stock <= threshold) {
                console.warn(`⚠️ ALERTA DE STOCK: El producto "${name}" tiene stock bajo (${stock}).`);
                // Aca se puede integrar un servicio de email o notificacion
            }
        }
    });

    next();
};