// test/application/usecases/borrow.test.js

const BORROW_USECASE = require('../../../application/usecases/borrowBook.usecase');
const BORROWING_REPOSITORY = require('../../../infrastructure/repositories/borrow.repository');
const MEMBER_REPOSITORY = require('../../../infrastructure/repositories/member.repository');
const BOOK_REPOSITORY = require('../../../infrastructure/repositories/book.repository');

jest.mock('../../../infrastructure/repositories/borrow.repository');
jest.mock('../../../infrastructure/repositories/member.repository');
jest.mock('../../../infrastructure/repositories/book.repository');

describe('BORROW_USECASE', () => {
    const mockData = { memberid: 1, bookid: 1 };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should throw an error if the member id is not found', async () => {
        MEMBER_REPOSITORY.findId.mockResolvedValue(null);

        await expect(BORROW_USECASE.borrow(mockData)).rejects.toThrow('Member Id not found');
    });

    test('should throw an error if the book id is not found', async () => {
        MEMBER_REPOSITORY.findId.mockResolvedValue([{}]); // Assuming an array is returned
        BOOK_REPOSITORY.findId.mockResolvedValue(null);

        await expect(BORROW_USECASE.borrow(mockData)).rejects.toThrow('Book Id not found');
    });

    test('should throw an error if the book is already borrowed by another member', async () => {
        MEMBER_REPOSITORY.findId.mockResolvedValue([{}]);
        BOOK_REPOSITORY.findId.mockResolvedValue([{}]);
        BORROWING_REPOSITORY.findIdBook.mockResolvedValue(null); // Simulate that the book is already borrowed

        await expect(BORROW_USECASE.borrow(mockData)).rejects.toThrow('Book is already borrowed by another member');
    });

    test('should throw an error if the member has already borrowed 2 books', async () => {
        MEMBER_REPOSITORY.findId.mockResolvedValue([{}]);
        BOOK_REPOSITORY.findId.mockResolvedValue([{}]);
        BORROWING_REPOSITORY.findIdBook.mockResolvedValue([{}]);
        BORROWING_REPOSITORY.countId.mockResolvedValue([{ count: 2 }]); // Member has already borrowed 2 books

        await expect(BORROW_USECASE.borrow(mockData)).rejects.toThrow('Member cannot be borrowed more than 2 books');
    });

    test('should throw an error if the member is currently penalized', async () => {
        MEMBER_REPOSITORY.findId.mockResolvedValue([{ penaltyenddate: '2024-09-15' }]); // Member is penalized
        BOOK_REPOSITORY.findId.mockResolvedValue([{}]);
        BORROWING_REPOSITORY.findIdBook.mockResolvedValue([{}]);
        BORROWING_REPOSITORY.countId.mockResolvedValue([{ count: 1 }]);

        await expect(BORROW_USECASE.borrow(mockData)).rejects.toThrow('Member is currently penalized');
    });

    test('should return data if all conditions are met', async () => {
        MEMBER_REPOSITORY.findId.mockResolvedValue([{}]);
        BOOK_REPOSITORY.findId.mockResolvedValue([{}]);
        BORROWING_REPOSITORY.findIdBook.mockResolvedValue([{}]);
        BORROWING_REPOSITORY.countId.mockResolvedValue([{ count: 1 }]); // Member has borrowed less than 2 books
        MEMBER_REPOSITORY.findId.mockResolvedValue([{ penaltyenddate: null }]); // Member is not penalized

        const result = await BORROW_USECASE.borrow(mockData);

        expect(result).toEqual(mockData);
    });
});
