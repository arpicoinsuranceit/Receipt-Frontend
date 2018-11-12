export class ProposalNoSeqNoDto {

    constructor(private proposalNo?: string, private seqNo?: string) { }

    get ProposalNo() {
        return this.proposalNo;
    }

    set ProposalNo(proposalNo: string) {
        this.proposalNo = proposalNo;
    }

    get SeqNo() {
        return this.seqNo;
    }

    set SeqNo(seqNo: string) {
        this.seqNo = seqNo;
    }

}