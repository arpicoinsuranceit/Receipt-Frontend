
export class SettlementDetails{
    constructor(private type?:string,private bank?:string,private branch?:string,private account?:string,
        private fromDate?:string,private toDate?:string){}

    get Type(){
        return this.type;
    }

    set Type(type:string){
        this.type=type;
    }

    get Bank(){
        return this.bank;
    }
    
    set Bank(bank:string){
        this.bank=bank;
    }

    get Branch(){
        return this.branch;
    }

    set Branch(branch:string){
        this.branch=branch;
    }

    get Account(){
        return this.account;
    }

    set Account(account:string){
        this.account=account;
    }

    get FromDate(){
        return this.fromDate;
    }

    set FromDate(fromDate:string){
        this.fromDate=fromDate;
    }

    get ToDate(){
        return this.toDate;
    }

    set ToDate(toDate:string){
        this.toDate=toDate;
    }

}