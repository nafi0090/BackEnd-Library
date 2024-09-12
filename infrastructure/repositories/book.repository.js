const db = require('../config/db.config');
const BOOK_DOMAIN = require('../../domain/entites/book.entities');

class BOOK_REPOSITORY {
    static async index() {
        try {
            const query = "SELECT * FROM book ORDER BY id ASC";
            const result_query = await db.query(query);
            const result = result_query.rows
            return result.map(results => new BOOK_DOMAIN(results.id, results.code, results.title, results.author, results.stock));
        } catch (err) {
            console.error(err.message);
            throw new Error("Error: Error Get Data Book");
        }
    }

    static async getDataAvailable() {
        try {
            const query = "SELECT * FROM book WHERE stock = 1 ORDER BY id ASC"
            const result_query = await db.query(query);
            const result = result_query.rows
            return result.map(results => new BOOK_DOMAIN(results.id, results.code, results.title, results.author, results.stock));
        } catch (err) {
            console.error(err.message);
            throw new Error("Error: Error Get Data Book");
        }
    }

    async findId(id) {
        try {
            const query = "SELECT id FROM book WHERE id = $1"
            const result_query = await db.query(query, [id]);
            const result = result_query.rows;
            return result.map(results => new BOOK_DOMAIN(results.id, results.code, results.title, results.author, results.stock));
        } catch (err) {
            console.error(err.message);
            throw new Error("Error: Error Get Data Book by Id");
        }
    }

    async findCode(code) {
        try {
            const query = "SELECT code FROM book WHERE code = $1";
            const result = await db.query(query, [code]);
            return result.rows
        } catch (err) {
            console.error(err.message);
            throw new Error("Error: Error Get Data Book by Id");
        }
    }

    static async create(data) {
        try {
            const {
                code,
                title,
                author,
                stock
            } = data;

            const Book_repository = new BOOK_REPOSITORY();
            const checkCode = await Book_repository.findCode(code);

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
            throw new Error("Error: Error Add Data Book");
        }
    }

    static async updateData(id, data) {
        try {
            const {
                code,
                title,
                author,
                stock
            } = data;

            const Book_repository = new BOOK_REPOSITORY();
            const findId = await Book_repository.findId(id);
            const checkCode = await Book_repository.findCode(code);

            if (!findId.length > 0) {
                throw new Error('Error: Id not found');
            }

            if (checkCode.length > 0) {
                throw new Error('Error: Code already exists');
            }

            const query = "UPDATE book SET code = $1, title = $2, author = $3, stock = $4 WHERE id = $5";
            const result_query = await db.query(query, [code, title, author, stock, id]);
            const result = result_query.rows;
            console.log(result);
            return result.map(results => new BOOK_DOMAIN(results.id, results.code, results.title, results.author, results.stock));
        } catch (err) {
            console.error(err.message);
            throw new Error("Error: Error update Data stock at Book");
        }
    }

    static async deleteData(id) {
        try {
            const query = "DELETE FROM book WHERE id = $1";
            const result_query = await db.query(query, [id]);
            const result = result_query.rows;
            return result.map(results => new BOOK_DOMAIN(results.id, results.code, results.title, results.author, results.stock));
        } catch (err) {
            console.error(err.message);
            throw new Error("Error: Error delete Data Book");
        }
    }
}

module.exports = BOOK_REPOSITORY