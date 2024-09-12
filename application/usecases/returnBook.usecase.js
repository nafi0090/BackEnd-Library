class ReturnBookUseCase {
    constructor(memberService, borrowingRepository, historyRepository) {
        this.memberService = memberService;
        this.borrowingRepository = borrowingRepository;
        this.historyRepository = historyRepository;
    }

    async execute(memberId, bookId, returnDate) {
        const borrowing = await this.borrowingRepository.findBorrowing(memberId, bookId);

        if (!borrowing) {
            throw new Error("This book was not borrowed by this member.");
        }

        const borrowedDate = new Date(borrowing.borrowedDate);
        const daysBorrowed = (new Date(returnDate) - borrowedDate) / (1000 * 60 * 60 * 24);

        if (daysBorrowed > 7) {
            await this.memberService.applyPenalty(memberId, 3);
        }

        await this.historyRepository.addToHistory(memberId, bookId, borrowedDate, returnDate);
        await this.borrowingRepository.removeBorrowing(memberId, bookId);
    }
}

module.exports = ReturnBookUseCase;