const { body, validationResult } = require('express-validator');

const validateProduct = [
    body('name')
        .trim()
        .notEmpty().withMessage('El nombre es requerido')
        .isString(),
    
    body('price')
        .isFloat({ gt: 0 }).withMessage('El precio debe ser mayor a 0'),
    
    body('stock')
        .isInt({ min: 0 }).withMessage('El stock debe ser un entero positivo'),
    
    body('category')
        .trim()
        .notEmpty().withMessage('La categoría es requerida')
        .isIn(['Electronica', 'Muebles', 'Accesorios', 'Ropa', 'Otros'])
        .withMessage('Categoría no válida'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                status: 'fail', 
                errors: errors.array() 
            });
        }
        next();
    }
];

module.exports = { validateProduct };