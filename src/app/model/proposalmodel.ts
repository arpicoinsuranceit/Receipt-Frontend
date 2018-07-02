export class ProposalModel{

    constructor (private proposalId? : string, private proposalDetailId? : string, private proposalCombine? : string){}

    get ProposalId (){
        return this.proposalId;
    }
    set ProposalId (proposalId : string){
        this.proposalId = proposalId;
    }
    
    get ProposalDetailId (){
        return this.proposalDetailId;
    }
    set ProposalDetailId (proposalDetailId : string){
        this.proposalDetailId = proposalDetailId;
    }

    get ProposalCombine (){
        return this.proposalCombine;
    }
    set ProposalCombine (proposalCombine : string){
        this.proposalCombine = proposalCombine;
    }
}