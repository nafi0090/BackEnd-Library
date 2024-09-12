const db = require('../config/db.config');
const BORROWING_ENTITY = require('../../domain/entites/borrow.entites');

class BORROWING_REPOSITORY {
    static async index() {
        try {
            const query = "SELECT * FROM borrowing ORDER BY id ASC";
            const result_query = await db.query(query);
            const result = result_query.rows;
            return result.map(results => new BORROWING_ENTITY(results.id, results.memberid, results.bookid, results.borrowedDate));
        } catch (err) {
            console.error(err.message);
            throw new Error("Error: Failed to get data Borrowing");
        }
    }

    static async findId(id) {
        try {
            const query = "SELECT * FROM borrowing WHERE id = $1 ORDER BY id ASC";
            const result_query = await db.query(query, [id]);
            return result_query.rows;
        } catch (err) {
            console.error(err.message);
            throw new Error("Error: Failed to get data Borrowing");
        }
    }

    static async countId(id) {
        try {
            const query = "SELECT COUNT(*) FROM borrowing WHERE memberid = $1";
            const result_query = await db.query(query, [id]);
            return result_query.rows;
        } catch (err) {
            console.error(err.message);
            throw new Error("Error: Failed to get data Borrowing");
        }
    }

    static async findIdBook(id) {
        try {
            const query = "SELECT * FROM borrowing WHERE bookid = $1 ORDER BY id ASC";
            const result_query = await db.query(query, [id]);
            return result_query.rows;
        } catch (err) {
            console.error(err.message);
            throw new Error("Error: Failed to get data Borrowing");
        }
    }

    static async create(data) {
        try {
            const {
                memberId,
                bookId
            } = data;
            // 
            // const query = "WITH inserted_borrowing AS ( INSERT INTO borrowing (memberId, bookId) VALUES ($1, $2) RETURNING *) UPDATE book SET stock = 0 WHERE id = $2;"
            const query = "INSERT INTO borrowing (memberid, bookid) VALUES ($1, $2) RETURNING *";
            const result_query = await db.query(query, [memberId, bookId]);
            return result_query.rows;
        } catch (err) {
            console.error(err.message);
            throw new Error("Error: Failed to create data borrow");
        }
    }
}


module.exports = BORROWING_REPOSITORY