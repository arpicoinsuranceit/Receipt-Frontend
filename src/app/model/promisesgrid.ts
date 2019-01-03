export class PromisesGrid {

    constructor(private id?: Number, private polNum?: string, private pprNum?: string,
        private dueDate?: string, private promiseDate?: string, private phoneNum?: string, private custName?: string,
        private custNic?: string, private amount? : number, private remark? : string, private payType? : string, private agent? : string, private branch? : string,
        private health?: string) { }

    get Id() {
        return this.id;
    }

    set Id(id: Number) {
        this.id = id;
    }

    get PolNum() {
        return this.polNum;
    }

    set PolNum(polNum: string) {
        this.polNum = polNum;
    }

    get PprNum() {
        return this.pprNum;
    }

    set PprNum(pprNum: string) {
        this.pprNum = pprNum;
    }

    get DueDate() {
        return this.dueDate;
    }

    set DueDate(dueDate: string) {
        this.dueDate = dueDate;
    }

    get PromiseDate() {
        return this.promiseDate;
    }

    set PromiseDate(promiseDate: string) {
        this.promiseDate = promiseDate;
    }


    get PhoneNum() {
        return this.phoneNum;
    }

    set PhoneNum(phoneNum: string) {
        this.phoneNum = phoneNum;
    }

    get CustName() {
        return this.custName;
    }

    set CustName(custName: string) {
        this.custName = custName;
    }

    get CustNic() {
        return this.custNic;
    }

    set CustNic(custNic: string) {
        this.custNic = custNic;
    }

    get Amount() {
        return this.amount;
    }

    set Amount(amount: number) {
        this.amount = amount;
    }

    get Remark() {
        return this.remark;
    }

    set Remark(remark: string) {
        this.remark = remark;
    }

    get PayType() {
        return this.payType;
    }

    set PayType(payType: string) {
        this.payType = payType;
    }

    get Agent() {
        return this.agent;
    }

    set Agent(agent: string) {
        this.agent = agent;
    }

    get Branch() {
        return this.branch;
    }

    set Branch(branch: string) {
        this.branch = branch;
    }

    get Health() {
        return this.health;
    }

    set Health(health: string) {
        this.health = health;
    }
}