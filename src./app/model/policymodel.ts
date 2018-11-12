export class PolicyModel{

    constructor (private policyId? : string, private policyDetailId? : string, private policyCombine? : string){}

    get PolicyId (){
        return this.policyId;
    }
    set PolicyId (policyId : string){
        this.policyId = policyId;
    }
    
    get PolicyDetailId (){
        return this.policyDetailId;
    }
    set PolicyDetailId (policyDetailId : string){
        this.policyDetailId = policyDetailId;
    }

    get PolicyCombine (){
        return this.policyCombine;
    }
    set PolicyCombine (policyCombine : string){
        this.policyCombine = policyCombine;
    }
}