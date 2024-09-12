const MEMBER_REPOSITORY = require('../../infrastructure/repositories/member.repository');

class MEMBER_SERVICE {
    static async getAllMembers() {
        try {
            const result = await MEMBER_REPOSITORY.index();
            return result;
        } catch (error) {
            throw new Error('Failed to fetch Members from repository');
        }
    }

    static async createMember(data) {
        try {
            const result = await MEMBER_REPOSITORY.create(data);
            return result;
        } catch (error) {
            throw new Error('Failed to created Members from repository');
        }
    }

    static async updateMember(id, data) {
        try {
            const result = await MEMBER_REPOSITORY.updateData(id, data);
            return result;
        } catch (error) {
            throw new Error('Failed to updated Members from repository');
        }
    }
    static async deleteMember(Id) {
        try {
            const result = await MEMBER_REPOSITORY.deleteData(Id);
            return result;
        } catch (error) {
            throw new Error('Failed to deleted Members from repository');
        }
    }
}

module.exports = MEMBER_SERVICE;