class History {
    constructor(id, memberId, bookId, borrowedDate, ReturnedDate) {
        this.id = id;
        this.memberId = memberId;
        this.bookId = bookId;
        this.borrowedDate = borrowedDate;
        this.returnedDate = returnedDate;
    }

}

module.exports = History