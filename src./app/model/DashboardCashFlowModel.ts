export class DashboardCashFlowModel {
    
    constructor(private csAmount?: number, private csCount?: number, private crAmount?: number, private crCount?: number,
        private cqAmount?: number, private cqCount?: number, private ddAmount?: number, private ddCount?: number) { }

    get CsAmount() {
        return this.csAmount;
    }

    set CsAmount(csAmount: number) {
        this.csAmount = csAmount;
    }

    get CsCount() {
        return this.csCount;
    }

    set CsCount(csCount: number) {
        this.csCount = csCount;
    }

    get CqAmount() {
        return this.cqAmount;
    }

    set CqAmount(cqAmount: number) {
        this.cqAmount = cqAmount;
    }

    get CqCount() {
        return this.cqCount;
    }

    set CqCount(cqCount: number) {
        this.cqCount = cqCount;
    }

    get CrAmount() {
        return this.crAmount;
    }

    set CrAmount(crAmount: number) {
        this.crAmount = crAmount;
    }

    get CrCount() {
        return this.crCount;
    }

    set CrCount(crCount: number) {
        this.crCount = crCount;
    }

    get DdAmount() {
        return this.ddAmount;
    }

    set DdAmount(ddAmount: number) {
        this.ddAmount = ddAmount;
    }

    get DdCount() {
        return this.ddCount;
    }

    set DdCount(ddCount: number) {
        this.ddCount = ddCount;
    }

}