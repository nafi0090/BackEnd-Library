const db = require('../config/db.config');
const BOOK_DOMAIN = require('../../domain/entites/book.entities');

class BOOK_REPOSITORY {
    static async index() {
        try {
            const query = "SELECT * FROM book ORDER BY id ASC";
            const result_query = await db.query(query);
            const result = result_query.rows;
            return result.map(results => new BOOK_DOMAIN(results.id, results.code, results.title, results.author, results.stock));
        } catch (err) {
            console.error(err.message);
            throw new Error("Error: Failed to get data books");
        }
    }

    static async getDataAvailable() {
        try {
            const query = "SELECT * FROM book WHERE stock = 1 ORDER BY id ASC";
            const result_query = await db.query(query);
            const result = result_query.rows;
            return result.map(results => new BOOK_DOMAIN(results.id, results.code, results.title, results.author, results.stock));
        } catch (err) {
            console.error(err.message);
            throw new Error("Error: Failed to get available books");
        }
    }

    static async findId(id) {
        try {
            const query = "SELECT * FROM book WHERE id = $1";
            const result_query = await db.query(query, [id]);
            const result = result_query.rows;
            return result.map(results => new BOOK_DOMAIN(results.id, results.code, results.title, results.author, results.stock));
        } catch (err) {
            console.error(err.message);
            throw new Error("Error: Failed to get book by ID");
        }
    }

    static async findCode(code) {
        try {
            const query = "SELECT * FROM book WHERE code = $1";
            const result = await db.query(query, [code]);
            return result.rows;
        } catch (err) {
            console.error(err.message);
            throw new Error("Error: Failed to get book by code");
        }
    }

    static async create(data) {
        try {
            const { code, title, author, stock } = data;
            const checkCode = await this.findCode(code);

            if (checkCode.length > 0) {
                throw new Error('Error: Code already exists');
            } else {
                const query = "INSERT INTO book (code, title, author, stock) VALUES ($1, $2, $3, $4) RETURNING *";
                const result_query = await db.query(query, [code, title, author, stock]);
                const result = result_query.rows;
                return result.map(results => new BOOK_DOMAIN(results.id, results.code, results.title, results.author, results.stock));
            }
        } catch (error) {
            console.error(error.message);
            throw new Error("Error: Failed to add book");
        }
    }

    static async updateData(id, data) {
        try {
            const { code, title, author, stock } = data;
            const findId = await this.findId(id);
            const checkCode = await this.findCode(code);

            if (findId.length === 0) {
                throw new Error('Error: ID not found');
            }

            if (checkCode.length > 0) {
                throw new Error('Error: Code already exists');
            }

            const query = "UPDATE book SET code = $1, title = $2, author = $3, stock = $4 WHERE id = $5 RETURNING *";
            const result_query = await db.query(query, [code, title, author, stock, id]);
            const result = result_query.rows;
            return result.map(results => new BOOK_DOMAIN(results.id, results.code, results.title, results.author, results.stock));
        } catch (err) {
            console.error(err.message);
            throw new Error("Error: Failed to update book");
        }
    }

    static async deleteData(id) {
        try {
            const findId = await this.findId(id);

            if (findId.length === 0) {
                throw new Error('Error: ID not found');
            }

            const query = "DELETE FROM book WHERE id = $1";
            await db.query(query, [id]);
            return { success: true };
        } catch (err) {
            console.error(err.message);
            throw new Error("Error: Failed to delete book");
        }
    }
}

module.exports = BOOK_REPOSITORY;
