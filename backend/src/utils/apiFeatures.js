const sql = require('mssql');

class ApiFeatures {
    constructor(queryParams) {
        this.queryParams = queryParams;
        this.page = parseInt(queryParams.page) || 1;
        this.limit = parseInt(queryParams.limit) || 10;
    }

    buildWhereClause() {
        let conditions = [];
        let parameters = [];

        if (this.queryParams.category) {
            conditions.push("category = @category");
            parameters.push({ name: 'category', type: sql.NVarChar, value: this.queryParams.category });
        }

        if (this.queryParams.search) {
            conditions.push("name LIKE @search");
            parameters.push({ name: 'search', type: sql.NVarChar, value: `%${this.queryParams.search}%` });
        }

        const queryPart = conditions.length > 0 ? 'WHERE ' + conditions.join(' AND ') : '';
        return { queryPart, parameters };
    }

    buildSql() {
        const { queryPart, parameters } = this.buildWhereClause();
        const offset = (this.page - 1) * this.limit;

        const query = `
            SELECT * FROM Products
            ${queryPart}
            ORDER BY createdAt DESC
            OFFSET ${offset} ROWS
            FETCH NEXT ${this.limit} ROWS ONLY;
        `;

        return { query, parameters };
    }
}

module.exports = ApiFeatures;