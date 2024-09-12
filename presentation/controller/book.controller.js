const BOOK_SERVICE = require('../../application/services/book.service');

async function index(req, res) {
    try {
        const result = await BOOK_SERVICE.getAllBooks();
        res.status(200).json({
            message: 'Books fetched successfully',
            data: result
        });
    } catch (error) {

    }
}

module.exports = {
    index
};