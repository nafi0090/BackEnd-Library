const BORROWING_REPOSITORY = require('../../infrastructure/repositories/borrow.repository');
const MEMBER_REPOSITORY = require('../../infrastructure/repositories/member.repository');
const BOOK_REPOSITORY = require('../../infrastructure/repositories/book.repository');

class RETURN_USECASE {
    static async returnBook(data) {
        const {
            memberid,
            bookid
        } = data;

        

        return data
    }
}

module.exports = RETURN_USECASE;