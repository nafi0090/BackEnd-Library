const HISTORY_REPOSITORY = require("../../infrastructure/repositories/history.repository")

class HISTORY_SERVICE {
    static async getAllHistories() {
        try {
            const result = await HISTORY_REPOSITORY.index();
            return result;
        } catch (error) {
            throw new Error('Failed to fetch histories from repository');
        }
    }

    static async deleteHistory(id) {
        try {
            const result = await HISTORY_REPOSITORY.delete(id);
            return result;
        } catch (error) {
            throw new Error('Failed to fetch histories from repository');
        }
    }
}

module.exports = HISTORY_SERVICE