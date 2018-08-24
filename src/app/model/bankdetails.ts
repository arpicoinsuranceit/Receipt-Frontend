export class BankDetails{
    
    constructor (private insType? : string, private colBank? : string, private insNo? : string
        , private branchCode? : string, private insDate? : string, private amount? : number, private status? : string, private remarks? : string){}

    
    get InsType () {
        return this.insType;
    }

    set InsType (insType : string) {
        this.insType = insType;
    }

    get ColBank () {
        return this.colBank;
    }

    set ColBank (colBank : string) {
        this.colBank = colBank;
    }

    get InsNo () {
        return this.insNo;
    }

    set InsNo (insNo : string) {
        this.insNo = insNo;
    }

    get BranchCode (){
        return this.branchCode;
    }

    set BranchCode (branchCode : string){
        this.branchCode = branchCode;
    }

    get InsDate (){
        return this.insDate;
    }

    set InsDate (insDate : string){
        this.insDate = insDate;
    }

    get Amount (){
        return this.amount;
    }

    set Amount (amount : number){
        this.amount = amount;
    }

    get Status (){
        return this.status;
    }

    set Status (status : string){
        this.status = status;
    }

    get Remarks (){
        return this.remarks;
    }

    set Remarks (remarks : string){
        this.remarks = remarks;
    }

}