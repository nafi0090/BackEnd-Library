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
                memberid,
                bookid
            } = data;
            // 
            // const query = "WITH inserted_borrowing AS ( INSERT INTO borrowing (memberId, bookId) VALUES ($1, $2) RETURNING *) UPDATE book SET stock = 0 WHERE id = $2;"
            const query = "INSERT INTO borrowing (memberid, bookid) VALUES ($1, $2) RETURNING *";
            const result_query = await db.query(query, [memberid, bookid]);

            const query_stock = "UPDATE book SET stock = 0 WHERE id = $1"
            await db.query(query_stock, [bookid]);

            return result_query.rows;
        } catch (err) {
            console.error(err.message);
            throw new Error("Error: Failed to create data borrow");
        }
    }

    static async findBorrowingByMemberAndBook(data) {
        try {
            const {
                memberid,
                bookid
            } = data
            const query = "SELECT * FROM borrowing WHERE memberid = $1 AND bookid = $2";
            const result_query = await db.query(query, [memberid, bookid]);
            return result_query.rows;

        } catch (err) {
            console.error(err.message);
            throw new Error("Error: Failed to check member and book data borrow");
        }
    }

    static async returnBook(borrowing, date) {
        try {
            const {
                id,
                memberid,
                bookid,
                borroweddate
            } = borrowing[0]

            const queryDeleteBorrowing = "DELETE FROM borrowing WHERE id = $1";
            const resultDeleteBorrowuing = await db.query(queryDeleteBorrowing, [id]);

            const queryUpdateStock = "UPDATE book SET stock = 1 WHERE id = $1";
            const resultUpdateStock = await db.query(queryUpdateStock, [bookid]);

            const queryInsertHistory = "INSERT INTO history (memberid, bookid, borroweddate, returneddate) VALUES ($1, $2, $3, $4)";
            const resultInsertHistory = await db.query(queryInsertHistory, [memberid, bookid, borroweddate, date]);

            return resultInsertHistory.rows;
        } catch (err) {
            console.error(err.message);
            throw new Error("Error: Failed to check member and book data borrow");
        }
    }
}


module.exports = BORROWING_REPOSITORY