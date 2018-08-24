export class PolicyDetails {
    constructor(private pprnum? : string, private polnum? : string, private polType? : string, private status? : string, private comDate? : string
        , private insMonth? : string, private date? : string, private amount? : number){}

    get Pprnum(){
        return this.pprnum;
    }
    set Pprnum(pprnum: string){
        this.pprnum = pprnum;
    }
    get Polnum(){
        return this.polnum;
    }
    set Polnum(polnum: string){
        this.polnum = polnum;
    }
    get PolType(){
        return this.polType;
    }
    set PolType(polType: string){
        this.polType = polType;
    }
    get Status(){
        return this.status;
    }
    set Status(status: string){
        this.status = status;
    }
    get ComDate(){
        return this.comDate;
    }
    set ComDate(comDate: string){
        this.comDate = comDate;
    }

    get InsMonth(){
        return this.insMonth;
    }
    set InsMonth(insMonth: string){
        this.insMonth = insMonth;
    }

    get Date(){
        return this.date;
    }
    set Date(date: string){
        this.date = date;
    }

    get Amount(){
        return this.amount;
    }
    set Amount(amount: number){
        this.amount = amount;
    }

}