const db = require('../config/db.config');
const MEMBER_DOMAIN = require('../../domain/entites/member.entities');

class MEMBER_REPOSITORY {
    static async index() {
        try {
            const query = "SELECT m.id, m.code, m.name,m.penaltyenddate, COUNT(b.id) AS borrowedBook FROM member m LEFT JOIN borrowing b ON m.id = b.memberid GROUP by m.id";
            const result_query = await db.query(query);
            const result = result_query.rows;
            return result.map(results => new MEMBER_DOMAIN(results.id, results.code, results.name, results.penaltyenddate, results.borrowedbook));
        } catch (err) {
            console.error(err.message);
            throw new Error("Error: Failed to get data members");
        }
    }

    static async findId(id) {
        try {
            const query = "SELECT * FROM member WHERE id = $1";
            const result_query = await db.query(query, [id]);
            const result = result_query.rows;
            return result.map(results => new MEMBER_DOMAIN(results.id, results.code, results.name, results.penaltyenddate));
        } catch (err) {
            console.error(err.message);
            throw new Error("Error: Failed to get member by ID");
        }
    }

    static async findCode(code) {
        try {
            const query = "SELECT * FROM member WHERE code = $1";
            const result = await db.query(query, [code]);
            return result.rows;
        } catch (err) {
            console.error(err.message);
            throw new Error("Error: Failed to get member by code");
        }
    }

    static async penaltyMember(id) {
        try {
            const query = "SELECT * FROM member WHERE id = $1 ORDER BY id ASC";
            const result_query = await db.query(query, [id]);
            return result_query.rows;
        } catch (err) {
            console.error(err.message);
            throw new Error("Error: Failed to get data penalty's member");
        }
    }

    static async create(data) {
        try {
            const {
                code,
                name
            } = data;
            const checkCode = await this.findCode(code);

            if (checkCode.length > 0) {
                throw new Error('Error: Code already exists');
            } else {
                const query = "INSERT INTO member (code, name) VALUES ($1, $2) RETURNING *";
                const result_query = await db.query(query, [code, name]);
                const result = result_query.rows;
                return result.map(results => new MEMBER_DOMAIN(results.id, results.code, results.name, results.penaltyenddate));
            }
        } catch (error) {
            console.error(error.message);
            throw new Error("Error: Failed to add member");
        }
    }

    static async updateData(id, data) {
        try {
            const {
                code,
                name
            } = data;
            const findId = await this.findId(id);
            const checkCode = await this.findCode(code);

            if (findId.length === 0) {
                throw new Error('Error: ID not found');
            }

            if (checkCode.length > 0) {
                throw new Error('Error: Code already exists');
            }

            const query = "UPDATE member SET code = $1, name = $2 WHERE id = $3 RETURNING *";
            const result_query = await db.query(query, [code, name, id]);
            const result = result_query.rows;
            return result.map(results => new MEMBER_DOMAIN(results.id, results.code, results.name, results.penaltyenddate));
        } catch (err) {
            console.error(err.message);
            throw new Error("Error: Failed to update member");
        }
    }

    static async deleteData(id) {
        try {
            const findId = await this.findId(id);

            if (findId.length === 0) {
                throw new Error('Error: ID not found');
            }

            const query = "DELETE FROM member WHERE id = $1";
            await db.query(query, [id]);
            return {
                success: true
            };
        } catch (err) {
            console.error(err.message);
            throw new Error("Error: Failed to delete member");
        }
    }
}

module.exports = MEMBER_REPOSITORY;