const BORROW_USECASE = require('../usecases/borrowBook.usecase');
const BORROW_REPOSITORY = require('../../infrastructure/repositories/borrow.repository');
const BOOK_REPOSITORY = require('../../infrastructure/repositories/book.repository');

class BORROW_SERVICE {
    static async getAllDataBorrow() {
        try {
            const result = await BORROW_REPOSITORY.index();
            return result;
        } catch (error) {
            throw new Error('Failed to fetch books from repository');
        }
    }

    static async borrowBook(data) {
        const {
            memberId,
            bookId
        } = data
        const validating_data = await BORROW_USECASE.borrow(data);
        const result = await BORROW_REPOSITORY.create(validating_data);
        if (!result) {
            throw new Error('failed creating borrow')
        }

        const updateStock = await BOOK_REPOSITORY.decreaseStock(bookId);
        if (!updateStock) {
            throw new Error('failed updating stock')
        }

        return result;
    }
}

module.exports = BORROW_SERVICE