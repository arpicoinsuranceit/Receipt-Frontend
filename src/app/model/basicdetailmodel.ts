export class BasicDetail {
    constructor(private branchCode?: string, private agentCode?: string, private custTitle?: string, private customerName?: string,
        private seqNo?: number, private id?: number, private productCode?: string, private productName?: string, private premium?: number,private payAmount?: number, private polfee? :number,
        private mobile? : string, private pprsta? : string, private id2?: string) { }

    set BranchCode(branchCode: string) {
        this.branchCode = branchCode;
    }

    get BranchCode() {
        return this.branchCode;
    }

    set AgentCode(agentCode: string) {
        this.agentCode = agentCode;
    }

    get AgentCode() {
        return this.agentCode;
    }

    set CustTitle(custTitle: string) {
        this.custTitle = custTitle;
    }

    get CustTitle() {
        return this.custTitle;
    }

    set CustomerName(customerName: string) {
        this.customerName = customerName;
    }

    get CustomerName() {
        return this.customerName;
    }

    set SeqNo(seqNo: number) {
        this.seqNo = seqNo;
    }

    get SeqNo() {
        return this.seqNo;
    }

    set Id(id: number) {
        this.id = id;
    }

    get Id() {
        return this.id;
    }

    set ProductCode(productCode: string) {
        this.productCode = productCode;
    }

    get ProductCode() {
        return this.productCode;
    }

    set ProductName(productName: string) {
        this.productName = productName;
    }

    get ProductName() {
        return this.productName;
    }

    
    set Premium(premium: number) {
        this.premium = premium;
    }

    get Premium() {
        return this.premium;
    }

    
    set PayAmount(payAmount: number) {
        this.payAmount = payAmount;
    }

    get PayAmount() {
        return this.payAmount;
    }

    set Polfee(polfee: number) {
        this.polfee = polfee;
    }

    get Polfee() {
        return this.polfee;
    }

    set Mobile(mobile: string) {
        this.mobile = mobile;
    }

    get Mobile() {
        return this.mobile;
    }

    set Pprsta(pprsta: string) {
        this.pprsta = pprsta;
    }

    get Pprsta() {
        return this.pprsta;
    }

    set Id2(id2: string) {
        this.id2 = id2;
    }

    get Id2() {
        return this.id2;
    }
}