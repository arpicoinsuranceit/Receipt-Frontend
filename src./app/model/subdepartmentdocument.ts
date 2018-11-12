export class DocumentType{
    constructor(private docTypeId? : number,
        private docName? : string){}

        get DocTypeId(){
            return this.docTypeId;
        }

        set DocTypeId(docTypeId : number){
            this.docTypeId=docTypeId;
        }

        get DocName(){
            return this.docName;
        }

        set DocName(docName : string){
            this.docName=docName;
        }

}