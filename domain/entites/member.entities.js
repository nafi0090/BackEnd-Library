class Member {
    constructor(id, code, name, penaltyenddate, borrowedbook) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.penaltyenddate = penaltyenddate;
        this.borrowedbook = borrowedbook;
    }
}

module.exports = Member;