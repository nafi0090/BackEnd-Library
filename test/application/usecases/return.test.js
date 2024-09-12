// __tests__/usecases/return.usecase.test.js
const RETURN_USECASE = require('../../../application/usecases/returnBook.usecase');

const BORROWING_REPOSITORY = require('../../../infrastructure/repositories/borrow.repository');
const MEMBER_REPOSITORY = require('../../../infrastructure/repositories/member.repository');
const BOOK_REPOSITORY = require('../../../infrastructure/repositories/book.repository');



// Mock dependencies
jest.mock('../../../infrastructure/repositories/borrow.repository');
jest.mock('../../../infrastructure/repositories/member.repository');
jest.mock('../../../infrastructure/repositories/book.repository');

describe('RETURN_USECASE', () => {
    describe('returnBook', () => {
        let mockData;

        beforeEach(() => {
            mockData = {
                memberId: 1,
                bookId: 101
            }; // Sample data for testing
        });

        test('should throw an error if the member did not borrow the book', async () => {
            BORROWING_REPOSITORY.findBorrowingByMemberAndBook.mockResolvedValue(null);

            await expect(RETURN_USECASE.returnBook(mockData)).rejects.toThrow('The member did not borrow this book');
        });

        test('should not apply a penalty if the book is returned within 7 days', async () => {
            const borrowing = [{
                borrowedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
            }]; // Borrowed 5 days ago
            BORROWING_REPOSITORY.findBorrowingByMemberAndBook.mockResolvedValue(borrowing);

            const result = await RETURN_USECASE.returnBook(mockData);

            expect(result).toEqual({
                message: 'Book returned successfully',
                penalty: 'No penalty',
            });
            expect(MEMBER_REPOSITORY.setPenalty).not.toHaveBeenCalled();
            expect(BORROWING_REPOSITORY.returnBook).toHaveBeenCalledWith(borrowing, expect.any(Date));
        });

        test('should apply a penalty if the book is returned after more than 7 days', async () => {
            const borrowing = [{
                borrowedDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000)
            }]; // Borrowed 10 days ago
            BORROWING_REPOSITORY.findBorrowingByMemberAndBook.mockResolvedValue(borrowing);

            const result = await RETURN_USECASE.returnBook(mockData);

            expect(result).toEqual({
                message: 'Book returned successfully',
                penalty: 'Member is penalized for 3 days',
            });
            expect(MEMBER_REPOSITORY.setPenalty).toHaveBeenCalledWith(mockData, expect.any(Date));
            expect(BORROWING_REPOSITORY.returnBook).toHaveBeenCalledWith(borrowing, expect.any(Date));
        });
    });
});