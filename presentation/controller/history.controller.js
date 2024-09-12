const HISTORY_SERVICE = require('../../application/services/history.service');

class HISTORY_CONTROLLER {
    static async index(req, res) {
        try {
            const result = await HISTORY_SERVICE.getAllHistories();
            res.status(200).json({
                message: 'Histories fetched successfully',
                data: result
            });
        } catch (err) {
            res.status(500).json({
                message: 'Error fetching Histories',
                error: err.message
            });
        }
    }
    static async delete(req, res) {
        try {
            const {
                id
            } = req.params
            const result = await HISTORY_SERVICE.deleteHistory(id);
            res.status(200).json({
                message: 'History Deleted successfully',
                data: result
            });
        } catch (err) {
            res.status(500).json({
                message: 'Error fetching Histories',
                error: err.message
            });
        }
    }
}

module.exports = HISTORY_CONTROLLER;