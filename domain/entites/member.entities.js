class Member {
    constructor(id, code, name, penaltyEndDate) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.penaltyEndDate = penaltyEndDate;
    }

    // check if currently penalty is active
    isPenalty() {
        if (!this.penaltyEndDate) {
            return false;
        }
        return new Date() < new Date(this.penaltyEndDate);
    }

    // update penalty status
    updatePenalty(days) {
        const penaltyEndDate = new Date();
        penaltyEndDate.setDate(penaltyEndDate.getDate() + days);
        this.penaltyEndDate = penaltyEndDate;
    }
}

module.exports = Member;