export class RmsDocTxnmGridModel {

    constructor(private docCode?: string, private docNo?: number, private agentCode?: string,
        private date?: string, private amount?: number) { }

    get DocCode() {
        return this.docCode;
    }

    set DocCode(docCode: string) {
        this.docCode = docCode;
    }

    get DocNo() {
        return this.docNo;
    }

    set DocNo(docNo: number) {
        this.docNo = docNo;
    }

    get AgentCode() {
        return this.agentCode;
    }

    set AgentCode(agentCode: string) {
        this.agentCode = agentCode;
    }

    get Date() {
        return this.date;
    }

    set Date(date: string) {
        this.date = date;
    }

    get Amount() {
        return this.amount;
    }

    set Amount(amount: number) {
        this.amount = amount;
    }
}