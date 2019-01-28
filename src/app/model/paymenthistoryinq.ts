export class PaymentHistoryInq {
    constructor(private date?: string,
        private dueAmt?: string,
        private dueDate?: string,
        private month?: string,
        private outstanding?: string,
        private remark?: string,
        private settledAmt?: string,
        private year?: string, ) { }

    get Date (){
        return this.date;
    }

    set Date (date : string){
        this.date = date;
    }

    get DueAmt (){
        return this.dueAmt;
    }

    set DueAmt (dueAmt : string){
        this.dueAmt = dueAmt;
    }

    get DueDate (){
        return this.dueDate;
    }

    set DueDate (dueDate : string){
        this.dueDate = dueDate;
    }

    get Month (){
        return this.month;
    }

    set Month (month : string){
        this.month = month;
    }

    get Outstanding (){
        return this.outstanding;
    }

    set Outstanding (outstanding : string){
        this.outstanding = outstanding;
    }

    get Remark (){
        return this.remark;
    }

    set Remark (remark : string){
        this.remark = remark;
    }

    get SettledAmt (){
        return this.settledAmt;
    }

    set SettledAmt (settledAmt : string){
        this.settledAmt = settledAmt;
    }

    get Year (){
        return this.year;
    }

    set Year (year : string){
        this.year = year;
    }

}