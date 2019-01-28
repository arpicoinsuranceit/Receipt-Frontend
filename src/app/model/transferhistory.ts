export class TransferHistory{
    constructor (private agentClass?: string,
    private agentCode?: string,
    private fromDate?: string,
    private name?: string,
    private toDate?: string){}

    get AgentClass (){
        return this.agentClass;
    }

    set AgentClass (agentClass : string){
        this.agentClass = agentClass;
    }

    get AgentCode (){
        return this.agentCode;
    }

    set AgentCode (agentCode : string){
        this.agentCode = agentCode;
    }

    get FromDate (){
        return this.fromDate;
    }

    set FromDate (fromDate : string){
        this.fromDate = fromDate;
    }

    get Name (){
        return this.name;
    }

    set Name (name : string){
        this.name = name;
    }

    get ToDate (){
        return this.toDate;
    }

    set ToDate (toDate : string){
        this.toDate = toDate;
    }
}