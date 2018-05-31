export class BankModel{
    
    constructor (private bankCode? : string, private bankName? : string){}

    get BankCode (){
        return this.bankCode;
    }

    set BankCode (bankCode : string){
        this.bankCode = bankCode;
    }

    get BankName () {
        return this.bankName;
    }

    set BankName (bankName : string) {
        this.bankName = bankName;
    }
}