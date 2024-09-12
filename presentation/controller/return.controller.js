const RETURN_SERVICE = require('../../application/services/return.service');

class RETURN_CONTROLLER {
    static async returnBook(req, res) {
        try {
            const data = req.body
            const result = await RETURN_SERVICE.returnBook(data);
            res.status(200).json({
                message: result.message,
                penalty: result.penalty,
            });
        } catch (err) {
            res.status(500).json({
                message: 'Error return',
                error: err.message
            });
        }
    }
}

module.exports = RETURN_CONTROLLER