const db = require('../config/db.config');

const BOOK = {
    index: async () => {
        try {
            const query = " SELECT * FROM Book ORDER BY id ASC";
            const result = await db.query(query);
            return result.rows;
        } catch (err) {
            console.error(err.message);
            throw new Error("Error: Error Get Data Book");
        }
    },
    getDataAvailable: async () => {
        try {
            const query = "SELECT * FROM Book WHERE stock = 1 ORDER BY id ASC"
            const result = await this.db.query(query);
            return result.rows;
        } catch (err) {
            console.error(err.message);
            throw new Error("Error: Error Get Data Book");
        }
    },
    findid: async (id) => {
        try {
            const query = "SELECT * FROM Book WHERE id = $1"
            const result = await db.query(query, [id]);
            return result.rows;
        } catch (err) {
            console.error(err.message);
            throw new Error("Error: Error Get Data Book by Id");
        }
    },
    create: async (data) => {
        try {
            const {
                code,
                title,
                author,
                stock
            } = data;
            const query = "INSERT INTO Book (code, title, author, stock) VALUES ($1, $2, $3, $4) RETURNING *";
            const result = await this.db.query(query, [code, title, author, stock]);
            return result.rows;
        } catch (err) {
            console.error(err.message);
            throw new Error("Error: Error Add Data Book");
        }
    },
    updateStock: async (id, data) => {
        try {
            const {
                stock
            } = data;
            const query = "UPDATE Book SET stock = $1 WHERE id = $2";
            const result = await this.db.query(query, [stock, id]);
            return result.rows;
        } catch (err) {
            console.error(err.message);
            throw new Error("Error: Error update Data stock at Book");
        }
    },
    delete: async (id) => {
        try {
            const query = " DELETE FROM Book WHERE id = $1";
            const result = await this.db.query(query, [id]);
            return result.rows
        } catch (err) {
            console.error(err.message);
            throw new Error("Error: Error delete Data Book");
        }
    }
}

module.exports = BOOK