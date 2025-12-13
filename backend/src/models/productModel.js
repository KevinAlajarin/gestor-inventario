const { sql, poolPromise } = require('../config/database');
const ApiFeatures = require('../utils/apiFeatures');

class ProductModel {
    static async getAllProducts(queryParams) {
        const pool = await poolPromise;
        const features = new ApiFeatures(queryParams);
        const { query, parameters } = features.buildSql();

        const request = pool.request();
        parameters.forEach(p => request.input(p.name, p.type, p.value));

        const result = await request.query(query);
        const countQuery = `SELECT COUNT(*) as total FROM Products ${features.buildWhereClause().queryPart}`;
        const countRequest = pool.request();
        parameters.forEach(p => countRequest.input(p.name, p.type, p.value)); 
        const countResult = await countRequest.query(countQuery);

        return {
            products: result.recordset,
            total: countResult.recordset[0].total,
            page: features.page,
            limit: features.limit
        };
    }

    static async getProductById(id) {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query('SELECT * FROM Products WHERE id = @id');
        return result.recordset[0];
    }

    static async createProduct(data) {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('name', sql.NVarChar, data.name)
            .input('description', sql.NVarChar, data.description)
            .input('price', sql.Decimal(10, 2), data.price)
            .input('stock', sql.Int, data.stock)
            .input('category', sql.NVarChar, data.category)
            .query(`
                INSERT INTO Products (name, description, price, stock, category)
                OUTPUT INSERTED.*
                VALUES (@name, @description, @price, @stock, @category)
            `);
        return result.recordset[0];
    }

    static async updateProduct(id, data) {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('id', sql.Int, id)
            .input('name', sql.NVarChar, data.name)
            .input('description', sql.NVarChar, data.description)
            .input('price', sql.Decimal(10, 2), data.price)
            .input('stock', sql.Int, data.stock)
            .input('category', sql.NVarChar, data.category)
            .query(`
                UPDATE Products 
                SET name = @name, description = @description, price = @price, stock = @stock, category = @category, updatedAt = GETDATE()
                OUTPUT INSERTED.*
                WHERE id = @id
            `);
        return result.recordset[0];
    }

    static async deleteProduct(id) {
        const pool = await poolPromise;
        await pool.request()
            .input('id', sql.Int, id)
            .query('DELETE FROM Products WHERE id = @id');
        return true;
    }

    static async checkLowStock(threshold = 10) {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('threshold', sql.Int, threshold)
            .query('SELECT * FROM Products WHERE stock < @threshold');
        return result.recordset;
    }
}

module.exports = ProductModel;