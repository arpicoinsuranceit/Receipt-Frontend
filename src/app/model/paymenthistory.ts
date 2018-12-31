export class PaymentHistoryModel {

    constructor(private txnyer?: string, private txnmth?: string, private txndat?: string,
        private setamt?: string, private dueamt?: string, private duedat?: string,
        private outstd?: string, private remark?: string) { }


    get Txnyer() {
        return this.txnyer;
    }

    set Txnyer(txnyer: string) {
        this.txnyer = txnyer;
    }

    get Txnmth() {
        return this.txnmth;
    }

    set Txnmth(txnmth: string) {
        this.txnmth = txnmth;
    }


    get Txndat() {
        return this.txndat;
    }

    set Txndat(txndat: string) {
        this.txndat = txndat;
    }

    get Setamt() {
        return this.setamt;
    }

    set Setamt(setamt: string) {
        this.setamt = setamt;
    }

    get Dueamt() {
        return this.dueamt;
    }

    set Dueamt(dueamt: string) {
        this.dueamt = dueamt;
    }

    get Duedat() {
        return this.duedat;
    }

    set Duedat(duedat: string) {
        this.duedat = duedat;
    }

    get Outstd() {
        return this.outstd;
    }

    set Outstd(outstd: string) {
        this.outstd = outstd;
    }

    get Remark() {
        return this.remark;
    }

    set Remark(remark: string) {
        this.remark = remark;
    }

}