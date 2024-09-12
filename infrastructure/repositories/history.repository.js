const db = require('../config/db.config');

class HISTORY_REPOSITORY {
    static async index() {
        try {
            const query = "SELECT * FROM history";
            const result = await db.query(query);
            return result.rows;
        } catch (err) {
            console.error(err.message);
            throw new Error("Error: Error Get Data History");
        }
    }

    static async findId(id) {
        try {
            const query = "SELECT * FROM history WHERE id = $1";
            const result_query = await db.query(query, [id]);
            const result = result_query.rows;
            return result
        } catch (err) {
            console.error(err.message);
            throw new Error("Error: Failed to get history by ID");
        }
    }
    static async delete(id) {
        try {
            const findId = await this.findId(id);

            if (findId.length === 0) {
                throw new Error('Error: ID not found');
            }
            
            const query = "DELETE FROM history WHERE id = $1";
            const result = await db.query(query, [id]);
            return {
                success: true
            };
        } catch (err) {
            console.error(err.message);
            throw new Error("Error: Error delete Data History");
        }
    }
}

module.exports = HISTORY_REPOSITORY;