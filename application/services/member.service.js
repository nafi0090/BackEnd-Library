class MemberService {
    constructor(datamember) {
        this.datamember = datamember;
    }

    // get all member borrowing book
    async getMemberBorrowing(memberId) {
        return await this.datamember.getMemberBorrowing(memberId);
    }

    // add penalty for member
    async addMemberPenalty(memberId, days) {
        const member = await this.datamember.findById(memberId);
        member.addMemberPenalty(days);
        await this.datamember.update(member);
    }
}

module.exports = MemberService;