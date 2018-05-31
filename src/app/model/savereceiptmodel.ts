export class SaveReceiptModel {
    constructor(private quotationId?: number, private quotationDetailId?: number, private bankCode?: string,
        private remark?: string, private payMode?: string, private amount?: number, private payAmountWord?: string,
        private productCode? : string, private branchCode? : string, private agentCode? : string) { }

    set QuotationId(quotationId : number) {
        this.quotationId = quotationId;
    }

    get QuotationId() {
        return this.quotationId;
    }

    set QuotationDetailId(quotationDetailId : number) {
        this.quotationDetailId = quotationDetailId;
    }

    get QuotationDetailId() {
        return this.quotationDetailId;
    }

    set BankCode(bankCode : string) {
        this.bankCode = bankCode;
    }

    get BankCode() {
        return this.bankCode;
    }

    set Remark(remark : string) {
        this.remark = remark;
    }

    get Remark() {
        return this.remark;
    }

    set PayMode(payMode : string) {
        this.payMode = payMode;
    }

    get PayMode() {
        return this.payMode;
    }

    set Amount(amount : number) {
        this.amount = amount;
    }

    get Amount() {
        return this.amount;
    }

    set PayAmountWord(payAmountWord : string) {
        this.payAmountWord = payAmountWord;
    }

    get PayAmountWord() {
        return this.payAmountWord;
    }

    set ProductCode(productCode : string) {
        this.productCode = productCode;
    }

    get ProductCode() {
        return this.productCode;
    }

    set BranchCode(branchCode : string) {
        this.branchCode = branchCode;
    }

    get BranchCode() {
        return this.branchCode;
    }

    set AgentCode(agentCode : string) {
        this.agentCode = agentCode;
    }

    get AgentCode() {
        return this.agentCode;
    }
 
}