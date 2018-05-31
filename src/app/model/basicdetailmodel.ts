export class BasicDetail {
    constructor(private branchCode?: string, private agentCode?: string, private custTitle?: string, private customerName?: string,
        private quotationDetailId?: number, private quotationId?: number, private productCode?: string, private productName?: string) { }

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

    set QuotationDetailId(quotationDetailId: number) {
        this.quotationDetailId = quotationDetailId;
    }

    get QuotationDetailId() {
        return this.quotationDetailId;
    }

    set QuotationId(quotationId: number) {
        this.quotationId = quotationId;
    }

    get QuotationId() {
        return this.quotationId;
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

}