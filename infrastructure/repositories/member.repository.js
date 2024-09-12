const db = require('../config/db.config');

const MEMBER = {
    index: async () => {
        try {
            const query = "SELECT * FROM Member ORDER BY id ASC";
            const result = await db.query(query);
            return result.rows;
        } catch (err) {
            console.error(err.message);
            throw new Error("Error: Error Get Data Member");
        }
    },
    findId: async (data) => {
        try {
            const query = "SELECT * FROM Member WHERE id = $1 ";
            const result = await this.db.query(query, [data]);
            return result.rows;
        } catch (err) {
            console.error(err.message);
            throw new Error("Error: Error Get Data Member by Id");
        }
    },
    create: async (data) => {
        try {
            const {
                code,
                name,
                penaltyEndDate
            } = data;
            const query = "INSERT INTO Member (code, name, penaltyEndDate) VALUES ($1, $2, $3) RETURNING *";
            const result = await this.db.query(query, [code, name, penaltyEndDate]);
            return result.rows;
        } catch (err) {
            console.error(err.message);
            throw new Error("Error: Error Add Data Member");
        }
    },
    updatePenalty: async (id, data) => {
        try {
            const {
                penaltyEndDate
            } = data;
            const query = "UPDATE Member SET penaltyEndDate = $1 WHERE id = $2 RETURNING *";
            const result = await this.db.query(query, [penaltyEndDate, id]);
            return result.rows;
        } catch (err) {
            console.error(err.message);
            throw new Error("Error: Error Update Data Penalty Member");
        }
    },
    delete: async (id) => {
        try {
            const query = " DELETE FROM Member WHERE id = $1";
            const result = await this.db.query(query, [id]);
            return result.rows
        } catch (err) {
            console.error(err.message);
            throw new Error("Error: Error delete Data Member");
        }
    }
}

module.exports = MEMBER;