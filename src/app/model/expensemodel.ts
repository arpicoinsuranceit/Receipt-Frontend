export class ExpenseModel {
    constructor(private expenseId? : string, private description? : string, private amount? : number,private qty? : number){}

    get ExpenseId(){
        return this.expenseId;
    }

    set ExpenseId(exprnseId : string){
        this.expenseId = exprnseId;
    }

    get Description(){
        return this.description;
    }

    set Description(description : string){
        this.description = description;
    }

    get Amount(){
        return this.amount;
    }

    set Amount(amount : number){
        this.amount = amount;
    }

    
    get Qty(){
        return this.qty;
    }

    set Qty(qty : number){
        this.qty = qty;
    }
}