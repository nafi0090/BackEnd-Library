class History {
    constructor(id, memberId, bookId, borrowedDate, ReturnedDate) {
        this.id = id;
        this.memberId = memberId;
        this.bookId = bookId;
        this.borrowedDate = borrowedDate;
        this.returnedDate = returnedDate;
    }

    // check has been returned
    isReturned() {
        this.returnedDate = new Date(returnedDate)
    }
}

module.exports = History