const ProductModel = require('../models/productModel');

exports.getAllProducts = async (req, res, next) => {
    try {
        const result = await ProductModel.getAllProducts(req.query);
        res.json({
            status: 'success',
            results: result.products.length,
            pagination: {
                total: result.total,
                page: result.page,
                limit: result.limit,
                totalPages: Math.ceil(result.total / result.limit)
            },
            data: result.products
        });
    } catch (err) {
        next(err);
    }
};

exports.getProduct = async (req, res, next) => {
    try {
        const product = await ProductModel.getProductById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
        res.json({ status: 'success', data: product });
    } catch (err) {
        next(err);
    }
};

exports.createProduct = async (req, res, next) => {
    try {
        const newProduct = await ProductModel.createProduct(req.body);
        res.status(201).json({ status: 'success', data: newProduct });
    } catch (err) {
        next(err);
    }
};

exports.updateProduct = async (req, res, next) => {
    try {
        const updatedProduct = await ProductModel.updateProduct(req.params.id, req.body);
        if (!updatedProduct) return res.status(404).json({ message: 'Producto no encontrado' });
        res.json({ status: 'success', data: updatedProduct });
    } catch (err) {
        next(err);
    }
};

exports.deleteProduct = async (req, res, next) => {
    try {
        await ProductModel.deleteProduct(req.params.id);
        res.status(204).json({ status: 'success', data: null });
    } catch (err) {
        next(err);
    }
};

exports.getLowStock = async (req, res, next) => {
    try {
        const threshold = parseInt(process.env.STOCK_THRESHOLD) || 10;
        const products = await ProductModel.checkLowStock(threshold);
        res.json({ status: 'success', count: products.length, data: products });
    } catch (err) {
        next(err);
    }
};