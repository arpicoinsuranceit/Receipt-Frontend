export class BenefitModel {
    constructor(private ridercode? : string, private ridername? : string, private term? : number,
         private sumassured? : string, private premium? : number){}

    get RiderCode(){
        return this.ridercode;
    }
    set RiderCode(ridercode: string){
        this.ridercode = ridercode;
    }

    get RiderName(){
        return this.ridername;
    }
    set RiderName(ridername: string){
        this.ridername = ridername;
    }
    get Term(){
        return this.term;
    }
    set Term(term: number){
        this.term = term;
    }
    get SumAssured(){
        return this.sumassured;
    }
    set SumAssured(sumassured: string){
        this.sumassured = sumassured;
    }
    get Premium(){
        return this.premium;
    }
    set Premium(premium: number){
        this.premium = premium;
    }
}