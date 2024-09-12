const BOOK_SERVICE = require('../../application/services/book.service');

class BOOK_CONTROLLER {
    static async index(req, res) {
        try {
            const result = await BOOK_SERVICE.getAllBooks();
            res.status(200).json({
                message: 'Books fetched successfully',
                data: result
            });
        } catch (err) {
            res.status(500).json({
                message: 'Error fetching books',
                error: err.message
            });
        }
    }

    static async create(req, res) {
        try {
            const data = req.body;
            const result = await BOOK_SERVICE.createBook(data);
            res.status(200).json({
                message: 'Books created successfully',
                data: result
            });
        } catch (err) {
            res.status(500).json({
                message: 'Error creating data book',
                error: err.message
            });
        }
    }

    static async updateData(req, res) {
        try {
            const {
                id
            } = req.params;
            const data = req.body;
            const result = await BOOK_SERVICE.updateBook(id, data);
            res.status(200).json({
                message: 'Books updated successfully',
                data: result
            });
        } catch (err) {
            res.status(500).json({
                message: 'Error updating data book',
                error: err.message
            });
        }
    }

    static async deleteData(req, res) {
        try {
            const {
                id
            } = req.params;
            const result = await BOOK_SERVICE.deleteBook(id);
            res.status(200).json({
                message: 'Books deleted successfully',
                data: result
            });
        } catch (err) {
            res.status(500).json({
                message: 'Error deleting data book',
                error: err.message
            });
        }
    }
}

module.exports = BOOK_CONTROLLER