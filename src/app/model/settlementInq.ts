export class SettlementInq {
    constructor(private branch?: string,
        private chqRel?: string,
        private docCode?: string,
        private docnum?: string,
        private name?: string,
        private payMode?: string,
        private totPremium?: number) { }

        get Branch(){
            return this.branch;
        }

        set Branch(branch : string){
            this.branch = branch;
        }

        get ChqRel(){
            return this.chqRel;
        }

        set ChqRel(chqRel : string){
            this.chqRel = chqRel;
        }

        get DocCode(){
            return this.docCode;
        }

        set DocCode(docCode : string){
            this.docCode = docCode;
        }

        get Docnum(){
            return this.docnum;
        }

        set Docnum(docnum : string){
            this.docnum = docnum;
        }

        get Name(){
            return this.name;
        }

        set Name(name : string){
            this.name = name;
        }

        get PayMode(){
            return this.payMode;
        }

        set PayMode(payMode : string){
            this.payMode = payMode;
        }

        get TotPremium(){
            return this.totPremium;
        }

        set TotPremium(totPremium : number){
            this.totPremium = totPremium;
        }
}