const RETURN_USECASE = require('../usecases/returnBook.usecase');

class RETURN_SERVICE {
    static async returnBook(data) {
        try {
            const result = await RETURN_USECASE.returnBook(data);
            return result;
        } catch (error) {
            throw new Error('Failed to return the book');
        }
    }
}

module.exports = RETURN_SERVICE