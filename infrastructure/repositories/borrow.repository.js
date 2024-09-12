const db = require('../config/db.config');

const BORROWING = {
    index: async () => {
        try {
            const query = "SELECT * FROM Borrowing ORDER BY id ASC";
            const result = await db.query(query);
            return result.rows;
        } catch (err) {
            console.error(err.message);
            throw new Error("Error: Error Get Data Borrowing");
        }
    },
    findId: async (id) => {
        try {
            const query = "SELECT * FROM Borrowing WHERE id = $1";
            const result = await this.db.query(query, [id]);
            return result.rowsl;
        } catch (err) {
            console.error(err.message);
            throw new Error("Error: Error Get Data Borrowing by Id");
        }
    },
    create: async (data) => {
        try {
            const {
                memberId,
                bookId,
                borrowedDate
            } = data;
            const query = "INSERT INTO Borrowing (memberId, bookId, borrowedDate) VALUES ($1, $2, $3) RETURNING *";
            const result = await this.db.query(query, [memberId, bookId, borrowedDate]);
            return result.rows;
        } catch (err) {
            console.error(err.message);
            throw new Error("Error: Error create Data Borrowing");
        }
    },
    delete: async (id) => {
        try {
            const query = "DELETE FROM Borrowing WHERE id = $1";
            const result = await this.db.query(query, [id]);
            return result.rows;
        } catch (err) {
            console.error(err.message);
            throw new Error("Error: Error delete Data Borrowing");
        }
    }
}

module.exports = BORROWING