export class Targets{
    constructor(private month?:string,private targetAmount?:number,private premium?:number,
        private orRate?:number,private cfAmount?:number,private achAmount?:number){}

    get Month(){
        return this.month;
    }

    set Month(month:string){
        this.month=month;
    }

    get TargetAmount(){
        return this.targetAmount;
    }

    set TargetAmount(targetAmount:number){
        this.targetAmount=targetAmount;
    }

    get Premium(){
        return this.premium;
    }

    set Premium(premium:number){
        this.premium=premium;
    }

    get OrRate(){
        return this.orRate;
    }

    set OrRate(orRate:number){
        this.orRate=orRate;
    }

    get CfAmount(){
        return this.cfAmount;
    }

    set CfAmount(cfAmount:number){
        this.cfAmount=cfAmount;
    }

    get AchAmount(){
        return this.achAmount;
    }

    set AchAmount(achAmount:number){
        this.achAmount=achAmount;
    }

}