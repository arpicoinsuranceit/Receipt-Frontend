export class NotRelCheque {

    constructor(private receipt?: string, private proposal?: string, private polnum?: string,
        private ppdnam?: string, private totprm?: string, private agent?: string, private loccod?: string,
        private chqnum?: string, private chqdat?: string, private chqbnk?: string, private creadt?: string) { }
    
    get Receipt(){
        return this.receipt;
    }

    set Receipt(receipt : string){
        this.receipt = receipt;
    }

    get Proposal(){
        return this.proposal;
    }

    set Proposal(proposal : string){
        this.proposal = proposal;
    }


    get Polnum(){
        return this.polnum;
    }

    set Polnum(polnum : string){
        this.polnum = polnum;
    }


    get Ppdnam(){
        return this.ppdnam;
    }

    set Ppdnam(ppdnam : string){
        this.ppdnam = ppdnam;
    }


    get Totprm(){
        return this.totprm;
    }

    set Totprm(totprm : string){
        this.totprm = totprm;
    }


    get Agent(){
        return this.agent;
    }

    set Agent(agent : string){
        this.agent = agent;
    }


    get Loccod(){
        return this.loccod;
    }

    set Loccod(loccod : string){
        this.loccod = loccod;
    }


    get Chqnum(){
        return this.chqnum;
    }

    set Chqnum(chqnum : string){
        this.chqnum = chqnum;
    }


    get Chqdat(){
        return this.chqdat;
    }

    set Chqdat(chqdat : string){
        this.chqdat = chqdat;
    }

    get Chqbnk(){
        return this.chqbnk;
    }

    set Chqbnk(chqbnk : string){
        this.chqbnk = chqbnk;
    }

    get Creadt(){
        return this.creadt;
    }

    set Creadt(creadt : string){
        this.creadt = creadt;
    }

    

}