export class QuotationModel{

    constructor (private quotationId? : string, private quotationDetailId? : string, private seqId? : string, private quoCombine? : string){}

    get QuotationId (){
        return this.quotationId;
    }
    set QuotationId (quotationId : string){
        this.quotationId = quotationId;
    }
    
    get QuotationDetailId (){
        return this.quotationDetailId;
    }
    set QuotationDetailId (quotationDetailId : string){
        this.quotationDetailId = quotationDetailId;
    }

    get QuoCombine (){
        return this.quoCombine;
    }
    set QuoCombine (quoCombine : string){
        this.quoCombine = quoCombine;
    }

    get SeqId (){
        return this.seqId;
    }
    set SeqId (seqId : string){
        this.seqId = seqId;
    }
}