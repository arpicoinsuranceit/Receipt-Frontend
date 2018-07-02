export class LastReceipt {
    constructor(private doccod? : string, private docnum? : string, private credat? : string,
         private pprnum? : string, private polnum? : string, private topprm? : number){}

    get Doccod(){
        return this.doccod;
    }
    set Doccod(doccod: string){
        this.doccod = doccod;
    }

    get Docnum(){
        return this.docnum;
    }
    set Docnum(docnum: string){
        this.docnum = docnum;
    }
    get Credat(){
        return this.credat;
    }
    set Credat(credat: string){
        this.credat = credat;
    }
    get Pprnum(){
        return this.pprnum;
    }
    set Pprnum(pprnum: string){
        this.pprnum = pprnum;
    }
    get Polnum(){
        return this.polnum;
    }
    set Polnum(polnum: string){
        this.polnum = polnum;
    }
    get Topprm(){
        return this.topprm;
    }
    set Topprm(topprm: number){
        this.topprm = topprm;
    }
}