class BorrowBookUseCase {
    constructor(bookService, memberService, borrowingRepository) {
        this.bookService = bookService;
        this.memberService = memberService;
        this.borrowingRepository = borrowingRepository;
    }

    async execute(memberId, bookId) {
        const member = await this.memberService.getMemberBorrowing(memberId);
        const availableBooks = await this.bookService.getAvailableBooks();

        if (member.isPenalized()) {
            throw new Error("Member is penalized and cannot borrow books.");
        }

        if (availableBooks.length === 0) {
            throw new Error("No available books to borrow.");
        }

        await this.borrowingRepository.borrowBook(memberId, bookId);
    }
}

module.exports = BorrowBookUseCase;