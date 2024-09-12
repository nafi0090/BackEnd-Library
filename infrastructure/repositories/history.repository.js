const db = require('../config/db.config');

const HISTORY = {
    index: async () => {
        try {
            const query = "SELECT * FROM History";
            const result = await db.query(query);
            return result.rows;
        } catch (err) {
            console.error(err.message);
            throw new Error("Error: Error Get Data History");
        }
    },
    create: async (data) => {
        try {
            const {
                memberId,
                bookId,
                borrowedDate,
                returnedDate
            } = data;
            const query = "INSERT INTO History (memberId, bookId, borrowedDate, returnedDate) VALUES ($1, $2, $3, $4) RETURNING *";
            const result = await this.db.query(query, [memberId, bookId, borrowedDate, returnedDate]);
            return result.rows;
        } catch (err) {
            console.error(err.message);
            throw new Error("Error: Error add Data History");
        }
    },
    delete: async (id) => {
        try {
            const query = "DELETE FROM History WHERE id = $1";
            const result = await this.db.query(query, [id]);
            return result.rows;
        } catch (err) {
            console.error(err.message);
            throw new Error("Error: Error delete Data History");
        }
    }
}

module.exports = HISTORY;