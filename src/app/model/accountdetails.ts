export class ReceiptDetails {
    constructor(private branch? : string, private accNo? : number, private description? : string, private dr? : number, private cr? : number){}

    get Branch(){
        return this.branch;
    }
    set Branch(branch: string){
        this.branch = branch;
    }
    get AccNo(){
        return this.accNo;
    }
    set AccNo(accNo: number){
        this.accNo = accNo;
    }
    get Description(){
        return this.description;
    }
    set Description(description: string){
        this.description = description;
    }
    get Dr(){
        return this.dr;
    }
    set Dr(dr: number){
        this.dr = dr;
    }
    get Cr(){
        return this.cr;
    }
    set Cr(cr: number){
        this.cr = cr;
    }

}