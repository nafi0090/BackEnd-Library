const BORROW_SERVICE = require('../../application/services/borrow.service');

class BORROW_CONTROLLER {

    static async index(req, res) {
        try {
            const result = await BORROW_SERVICE.getAllDataBorrow();
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

    static async borrow(req, res) {
        try {
            const data = req.body;
            const result = await BORROW_SERVICE.borrowBook(data);
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
}

module.exports = BORROW_CONTROLLER;