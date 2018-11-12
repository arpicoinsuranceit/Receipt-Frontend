export class GeneralInfo{
    
    constructor (private proposalNo? : number, private policyNo? : number,private branchCode? : string , private commencementData? : string,
        private expDate? : string,private product? : string,private productCode? : string){

        }

    get ProposalNo (){
        return this.proposalNo;
    }

    set ProposalNo (proposalNo : number){
        this.proposalNo = proposalNo;
    }

    get BranchCode (){
        return this.branchCode;
    }

    set BranchCode (branchCode : string){
        this.branchCode = branchCode;
    }

    get PolicyNo () {
        return this.policyNo;
    }

    set PolicyNo (policyNo : number) {
        this.policyNo = policyNo;
    }

    get CommencementDate () {
        return this.commencementData;
    }

    set CommencementDate (commencementData : string) {
        this.commencementData = commencementData;
    }

    get ExpDate () {
        return this.expDate;
    }

    set ExpDate (expDate : string) {
        this.expDate = expDate;
    }

    get Product () {
        return this.product;
    }

    set Product (product : string) {
        this.product = product;
    }

    get ProductCode () {
        return this.productCode;
    }

    set ProductCode (productCode : string) {
        this.productCode = productCode;
    }

}