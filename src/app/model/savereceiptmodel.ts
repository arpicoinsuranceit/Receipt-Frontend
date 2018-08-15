export class SaveReceiptModel {
    constructor(private quotationId?: number, private seqNo?: number, private quotationDetailId?: number, private propId?: number, private propSeq?: number,
        private bankCode?: string, private remark?: string, private payMode?: string, private amount?: number, private payAmountWord?: string,
        private productCode?: string, private branchCode?: string, private agentCode?: string,
        private chequeno?: string, private chequedate?: string, private chequebank?: string, private transferno?: string,
        private token?: string, private polId?: number, private polSeq?: number) { }

    set PolId(polId: number) {
        this.polId = polId;
    }

    get PolId() {
        return this.polId;
    }

    set SeqNo(seqNo: number) {
        this.seqNo = seqNo;
    }

    get SeqNo() {
        return this.seqNo;
    }

    set PolSeq(polSeq: number) {
        this.polSeq = polSeq;
    }

    get PolSeq() {
        return this.polSeq;
    }


    set QuotationId(quotationId: number) {
        this.quotationId = quotationId;
    }

    get QuotationId() {
        return this.quotationId;
    }

    set QuotationDetailId(quotationDetailId: number) {
        this.quotationDetailId = quotationDetailId;
    }

    get QuotationDetailId() {
        return this.quotationDetailId;
    }

    set PropId(propId: number) {
        this.propId = propId;
    }

    get PropId() {
        return this.propId;
    }

    set PropSeq(propSeq: number) {
        this.propSeq = propSeq;
    }

    get PropSeq() {
        return this.propSeq;
    }

    set BankCode(bankCode: string) {
        this.bankCode = bankCode;
    }

    get BankCode() {
        return this.bankCode;
    }

    set Remark(remark: string) {
        this.remark = remark;
    }

    get Remark() {
        return this.remark;
    }

    set PayMode(payMode: string) {
        this.payMode = payMode;
    }

    get PayMode() {
        return this.payMode;
    }

    set Amount(amount: number) {
        this.amount = amount;
    }

    get Amount() {
        return this.amount;
    }

    set PayAmountWord(payAmountWord: string) {
        this.payAmountWord = payAmountWord;
    }

    get PayAmountWord() {
        return this.payAmountWord;
    }

    set ProductCode(productCode: string) {
        this.productCode = productCode;
    }

    get ProductCode() {
        return this.productCode;
    }

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

    set Chequeno(chequeno: string) {
        this.chequeno = chequeno;
    }

    get Chequeno() {
        return this.chequeno;
    }

    set Chequebank(chequebank: string) {
        this.chequebank = chequebank;
    }

    get Chequebank() {
        return this.chequebank;
    }

    set Transferno(transferno: string) {
        this.transferno = transferno;
    }

    get Transferno() {
        return this.transferno;
    }

    set Chequedate(chequedate: string) {
        this.chequedate = chequedate;
    }

    get Chequedate() {
        return this.chequedate;
    }
    set Token(token: string) {
        this.token = token;
    }

    get Token() {
        return this.token;
    }

}