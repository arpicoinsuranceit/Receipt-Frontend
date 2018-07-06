export class LoadUWProposals{
    
    constructor (private proposalNo? : string, private sequenceNo? : string, private policyNo? : string,private customer? : string , private proposedName? : string,
        private agent? : string,private policyBranch? : string,private agentBranch? : string,private nic? : string){

        }

    get ProposalNo (){
        return this.proposalNo;
    }

    set ProposalNo (proposalNo : string){
        this.proposalNo = proposalNo;
    }

    get SequenceNo (){
        return this.sequenceNo;
    }

    set SequenceNo (sequenceNo : string){
        this.sequenceNo = sequenceNo;
    }

    get PolicyNo () {
        return this.policyNo;
    }

    set PolicyNo (policyNo : string) {
        this.policyNo = policyNo;
    }

    get Customer () {
        return this.customer;
    }

    set Customer (customer : string) {
        this.customer = customer;
    }

    get ProposedName () {
        return this.proposedName;
    }

    set ProposedName (proposedName : string) {
        this.proposedName = proposedName;
    }

    get Nic () {
        return this.nic;
    }

    set Nic (nic : string) {
        this.nic = nic;
    }

    get Agent () {
        return this.agent;
    }

    set Agent (agent : string) {
        this.agent = agent;
    }

    get PolicyBranch () {
        return this.policyBranch;
    }

    set PolicyBranch (policyBranch : string) {
        this.policyBranch = policyBranch;
    }

    get AgentBranch () {
        return this.agentBranch;
    }

    set AgentBranch (agentBranch : string) {
        this.agentBranch = agentBranch;
    }
}