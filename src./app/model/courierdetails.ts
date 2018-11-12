export class CourierDetails{
    constructor(private referenceNumber?: string,private polNo?: string,private prpNo?: string,private agentCode?: string,private branch?: string,private underwriterEmail?: string
        ,private department?: string,private docType?: string,private remarks?: string,private status?: string,private user?: string){}


    get ReferenceNumber(){
        return this.referenceNumber;
    }

    set ReferenceNumber(referenceNumber: string){
        this.referenceNumber=referenceNumber;
    }

    get PolNo(){
        return this.polNo;
    }

    set PolNo(polNo:string){
        this.polNo=polNo;
    }

    get PrpNo(){
        return this.prpNo;
    }

    set PrpNo(prpNo:string){
        this.prpNo=prpNo;
    }

    get AgentCode(){
        return this.agentCode;
    }

    set AgentCode(agentCode:string){
        this.agentCode=agentCode;
    }

    get Branch(){
        return this.branch;
    }

    set Branch(branch:string){
        this.branch=branch;
    }

    get UnderwriterEmail(){
        return this.underwriterEmail;
    }

    set UnderwriterEmail(underwriterEmail:string){
        this.underwriterEmail=underwriterEmail;
    }

    get Department(){
        return this.department;
    }

    set Department(department:string){
        this.department=department;
    }

    get DocType(){
        return this.docType;
    }

    set DocType(docType:string){
        this.docType=docType;
    }

    get Remarks(){
        return this.remarks;
    }

    set Remarks(remarks:string){
        this.remarks=remarks;
    }

    get Status(){
        return this.status;
    }

    set Status(status:string){
        this.status=status;
    }

    get User(){
        return this.user;
    }

    set User(user:string){
        this.user=user;
    }

}