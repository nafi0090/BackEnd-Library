const MEMBER_SERVICE = require('../../application/services/member.service');

class MEMBER_CONTROLLER {
    static async index(req, res) {
        try {
            const result = await MEMBER_SERVICE.getAllMembers();
            res.status(200).json({
                message: 'members fetched successfully',
                data: result
            });
        } catch (err) {
            res.status(500).json({
                message: 'Error fetching members',
                error: err.message
            });
        }
    }

    static async create(req, res) {
        try {
            const data = req.body;
            const result = await MEMBER_SERVICE.createMember(data);
            res.status(200).json({
                message: 'members created successfully',
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
            const result = await MEMBER_SERVICE.updateMember(id, data);
            res.status(200).json({
                message: 'members updated successfully',
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
            const result = await MEMBER_SERVICE.deleteMember(id);
            res.status(200).json({
                message: 'members deleted successfully',
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

module.exports = MEMBER_CONTROLLER