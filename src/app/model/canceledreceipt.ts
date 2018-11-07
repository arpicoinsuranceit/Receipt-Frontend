export class CanceledReceiptDto{
    constructor(private sbuCode?:string,private locCode?:string,private receiptNo?:string,private polNum?:string
        ,private pprNum?:string,private reason?:string,private status?:string,private requestBy?:string,private requestDate?:string
        ,private amount?:number,private docCode?:string,private approvedBy?:string,private approvedDate?:string,private gmRemark?:string){}

    get SbuCode(){
        return this.sbuCode;
    }

    set SbuCode(sbuCode:string){
        this.sbuCode=sbuCode;
    }

    get LocCode(){
        return this.locCode;
    }

    set LocCode(locCode:string){
        this.locCode=locCode;
    }

    get ReceiptNo(){
        return this.receiptNo;
    }

    set ReceiptNo(receiptNo:string){
        this.receiptNo=receiptNo;
    }

    get PolNum(){
        return this.polNum;
    }

    set PolNum(polNum:string){
        this.polNum=polNum;
    }

    get PprNum(){
        return this.pprNum;
    }

    set PprNum(pprNum:string){
        this.pprNum=pprNum;
    }

    get Reason(){
        return this.reason;
    }

    set Reason(reason:string){
        this.reason=reason;
    }

    get Status(){
        return this.status;
    }

    set Status(status:string){
        this.status=status;
    }

    get RequestBy(){
        return this.requestBy;
    }

    set RequestBy(requestBy:string){
        this.requestBy=requestBy;
    }

    get RequestDate(){
        return this.requestDate;
    }

    set RequestDate(requestDate:string){
        this.requestDate=requestDate;
    }

    get Amount(){
        return this.amount;
    }

    set Amount(amount:number){
        this.amount=amount;
    }

    get DocCode(){
        return this.docCode;
    }

    set DocCode(docCode:string){
        this.docCode=docCode;
    }

    get ApprovedBy(){
        return this.approvedBy;
    }

    set ApprovedBy(approvedBy:string){
        this.approvedBy=approvedBy;
    }

    get GmRemark(){
        return this.gmRemark;
    }

    set GmRemark(gmRemark:string){
        this.gmRemark=gmRemark;
    }

    get ApprovedDate(){
        return this.approvedDate;
    }

    set ApprovedDate(approvedDate:string){
        this.approvedDate=approvedDate;
    }
    
}