class BORROWING_ENTITY {
    constructor(id, memberid, bookid, borrowedDate) {
        this.id = id;
        this.memberid = memberid;
        this.bookId = bookid;
        this.borrowedDate = borrowedDate;
    }
}

module.exports = BORROWING_ENTITY;