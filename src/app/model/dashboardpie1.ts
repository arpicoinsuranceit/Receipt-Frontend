export class DashboardPie1 {

    constructor(private newBusinessVal?: number, private newBusinessCount?: number,
        private propVal?: number, private propCount?: number, private polVal?: number,
        private polCount?: number, private invVal?: number, private invCount?: number,
        private glVal?: number, private glCount?: number, private total?: number) { }


    get NewBusinessVal() {
        return this.newBusinessVal;
    }

    set NewBusinessVal(newBusinessVal: number) {
        this.newBusinessVal = newBusinessVal;
    }

    set NewBusinessCount(newBusinessCount: number) {
        this.newBusinessCount = newBusinessCount;
    }

    get NewBusinessCount() {
        return this.newBusinessCount;
    }

    

    get PropVal() {
        return this.propVal;
    }

    set PropVal(propVal: number) {
        this.propVal = propVal;
    }

    get PropCount() {
        return this.propCount;
    }

    set PropCount(propCount: number) {
        this.propCount = propCount;
    }

    get PolVal() {
        return this.polVal;
    }

    set PolVal(polVal: number) {
        this.polVal = polVal;
    }

    get PolCount() {
        return this.polCount;
    }

    set PolCount(polCount: number) {
        this.polCount = polCount;
    }

    get InvVal() {
        return this.invVal;
    }

    set InvVal(invVal: number) {
        this.invVal = invVal;
    }


    get InvCount() {
        return this.invCount;
    }

    set InvCount(invCount: number) {
        this.invCount = invCount;
    }

    get GlVal() {
        return this.glVal;
    }

    set GlVal(glVal: number) {
        this.glVal = glVal;
    }

    get GlCount() {
        return this.glCount;
    }

    set GlCount(glCount: number) {
        this.glCount = glCount;
    }

    get Total() {
        return this.total;
    }

    set Total(total: number) {
        this.total = total;
    }
}