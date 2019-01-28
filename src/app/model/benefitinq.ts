export class BenefitInq{
    constructor (private riderCode? : string, private riderName? : string, private type? : string, 
        private sumAssured? : number, private term? : number, private premium? : number){}

    get RiderCode(){
        return this.riderCode;
    }
    set RiderCode(riderCode : string){
        this.riderCode = riderCode;
    }

    get RiderName(){
        return this.riderName;
    }
    set RiderName(riderName : string){
        this.riderName = riderName;
    }

    get Type(){
        return this.type;
    }
    set Type(type : string){
        this.type = type;
    }

    get SumAssured(){
        return this.sumAssured;
    }
    set SumAssured(sumAssured : number){
        this.sumAssured = sumAssured;
    }

    get Term(){
        return this.term;
    }
    set Term(term : number){
        this.term = term;
    }

    get Premium(){
        return this.premium;
    }
    set Premium(premium : number){
        this.premium = premium;
    }


}