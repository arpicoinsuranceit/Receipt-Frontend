export class LoadInquiry {


    constructor(private proposalNo?: string,
        private policyNo?: string,
        private mainLifeName?: string,
        private nic?: string,
        private product?: string,
        private status?: string,
        private advisorCode?: string) { }


    set ProposalNo(proposalNo: string) {
        this.proposalNo = proposalNo;
    }
    get ProposalNo() {
        return this.proposalNo;
    }

    set PolicyNo(policyNo: string) {
        this.policyNo = policyNo;
    }
    get PolicyNo() {
        return this.policyNo;
    }
    set MainLifeName(mainLifeName: string) {
        this.mainLifeName = mainLifeName;
    }
    get MainLifeName() {
        return this.mainLifeName;
    }
    set Nic(nic: string) {
        this.nic = nic;
    }
    get Nic() {
        return this.nic;
    }
    set Product(product: string) {
        this.product = product;
    }
    get Product() {
        return this.product;
    }

    set Status(status: string) {
        this.status = status;
    }
    get Status() {
        return this.status;
    }

    set AdvisorCode(advisorCode: string) {
        this.advisorCode = advisorCode;
    }
    get AdvisorCode() {
        return this.advisorCode;
    }
    
}