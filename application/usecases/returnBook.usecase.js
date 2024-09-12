const BORROWING_REPOSITORY = require('../../infrastructure/repositories/borrow.repository');
const MEMBER_REPOSITORY = require('../../infrastructure/repositories/member.repository');
const BOOK_REPOSITORY = require('../../infrastructure/repositories/book.repository');

class RETURN_USECASE {
    static async returnBook(data) {

        const borrowing = await BORROWING_REPOSITORY.findBorrowingByMemberAndBook(data);
        if (!borrowing) {
            throw new Error('The member did not borrow this book');
        }

        const borrowedDate = new Date(borrowing[0].borrowedDate);
        const today = new Date();

        const diffTime = Math.abs(today.getTime() - borrowedDate.getTime());
        const diffDate = Math.ceil(diffTime / (1000 * 60 * 60 * 24));;

        if (diffDate > 7) {
            const penaltyDate = new Date(today);
            penaltyDate.setDate(today.getDate() + 3);

            await MEMBER_REPOSITORY.setPenalty(data, penaltyDate);
        }

        await BORROWING_REPOSITORY.returnBook(borrowing, today)

        return {
            message: 'Book returned successfully',
            penalty: diffDate > 7 ? 'Member is penalized for 3 days' : 'No penalty',
        };
    }
}

module.exports = RETURN_USECASE;