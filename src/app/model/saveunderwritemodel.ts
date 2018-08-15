import { MainlifeUnderwriteModel } from './mainlifeUnderwrite';
import { NomineeModel } from './nomineemodel';
import { ChildModel } from './childmodel';
import { SpouseUnderwriteModel } from './spouseunderwrite';
export class SaveUnderwriteModel {
    constructor(private sendToApprove?:boolean,private proposalNo?:number,private seqNo?:number,private quotationNo?:number,private quotationDetailNo?:number
        ,private token?:string,private propDate?:string,private agentCode?:string, private mainlifeUnderwriteDto?:MainlifeUnderwriteModel , private spouseUnderwriteDto?:SpouseUnderwriteModel
        , private children?:ChildModel[],private nominee?:NomineeModel[]) { }

    set SendToApprove(sendToApprove: boolean) {
        this.sendToApprove = sendToApprove;
    }

    get SendToApprove() {
        return this.sendToApprove;
    }

    set ProposalNo(proposalNo: number) {
        this.proposalNo = proposalNo;
    }

    get ProposalNo() {
        return this.proposalNo;
    }

    set SeqNo(seqNo: number) {
        this.seqNo = seqNo;
    }

    get SeqNo() {
        return this.seqNo;
    }

    set QuotationNo(quotationNo: number) {
        this.quotationNo = quotationNo;
    }

    get QuotationNo() {
        return this.quotationNo;
    }

    set QuotationDetailNo(quotationDetailNo: number) {
        this.quotationDetailNo = quotationDetailNo;
    }

    get QuotationDetailNo() {
        return this.quotationDetailNo;
    }

    set Token(token:string){
        this.token=token;
    }
    
    get Token(){
        return this.token;
    }

    set PropDate(propDate:string){
        this.propDate=propDate;
    }
    
    get PropDate(){
        return this.propDate;
    }

    set AgentCode(agentCode:string){
        this.agentCode=agentCode;
    }
    
    get AgentCode(){
        return this.agentCode;
    }


    set MainlifeUnderwriteDto(mainlifeUnderwriteDto: MainlifeUnderwriteModel) {
        this.mainlifeUnderwriteDto = mainlifeUnderwriteDto;
    }

    get MainlifeUnderwriteDto() {
        return this.mainlifeUnderwriteDto;
    }

    set SpouseUnderwriteDto(spouseUnderwriteDto: SpouseUnderwriteModel) {
        this.spouseUnderwriteDto = spouseUnderwriteDto;
    }

    get SpouseUnderwriteDto() {
        return this.spouseUnderwriteDto;
    }

    set Children(children: ChildModel[]) {
        this.children = children;
    }

    get Children() {
        return this.children;
    }

    set Nominee(nominee: NomineeModel[]) {
        this.nominee = nominee;
    }

    get Nominee() {
        return this.nominee;
    }

}