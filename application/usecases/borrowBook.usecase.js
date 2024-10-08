const BORROWING_REPOSITORY = require('../../infrastructure/repositories/borrow.repository');
const MEMBER_REPOSITORY = require('../../infrastructure/repositories/member.repository');
const BOOK_REPOSITORY = require('../../infrastructure/repositories/book.repository');

class BORROW_USECASE {
    static async borrow(data) {
        const {
            memberid,
            bookid
        } = data;

        const findIdMember = await MEMBER_REPOSITORY.findId(memberid);
        if (!findIdMember) {
            throw new Error('Member Id not found')
        }

        const findIdBook = await BOOK_REPOSITORY.findId(bookid);
        if (!findIdBook) {
            throw new Error('Book Id not found')
        }

        const borrowedBook = await BORROWING_REPOSITORY.findIdBook(bookid);
        if (!borrowedBook) {
            throw new Error('Book is already borrowed by another member')
        }

        const borrowedMember = await BORROWING_REPOSITORY.countId(memberid);
        if (borrowedMember[0].count >= 2) {
            throw new Error('Member cannot be borrowed more than 2 books')
        }

        const penaltyMember = await MEMBER_REPOSITORY.findId(memberid);
        if (penaltyMember[0].penaltyenddate != null) {
            throw new Error('Member is currently penalized')
        }

        return data
    }
}

module.exports = BORROW_USECASE;