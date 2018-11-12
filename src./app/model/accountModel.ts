export class AccountModel{

    constructor(private id?: string, private description?: string, private remark?: string, private amount?: string) {}

    get Id() {
        return this.id;
    }

    set Id(id : string) {
        this.id = id;
    }

    get Description() {
        return this.description;
    }

    set Description(description : string) {
        this.description = description;
    }

    get Remark() {
        return this.remark;
    }

    set Remark(remark : string) {
        this.remark = remark;
    }


    get Amount() {
        return this.amount;
    }

    set Amount(amount : string) {
        this.amount = amount;
    }
}