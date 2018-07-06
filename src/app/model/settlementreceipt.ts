export class SettlementReceipt {
    constructor(private number? : string, private name? : string, private amount? : number,
         private branchCode? : string, private cheque? : string ,private paymod? : string){}

    get Number(){
        return this.number;
    }
    set Number(number: string){
        this.number = number;
    }

    get Name(){
        return this.name;
    }
    set Name(name: string){
        this.name = name;
    }
    get Amount(){
        return this.amount;
    }
    set Amount(amount: number){
        this.amount = amount;
    }
    get BranchCode(){
        return this.branchCode;
    }
    set BranchCode(branchCode: string){
        this.branchCode = branchCode;
    }
    get Cheque(){
        return this.cheque;
    }
    set Cheque(cheque: string){
        this.cheque = cheque;
    }

    get PayMod(){
        return this.paymod;
    }
    set PayMod(paymod: string){
        this.paymod = paymod;
    }
}