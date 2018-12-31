export class ShortPemium {

    constructor(
        private quonum?: number,
        private pprnum?: string,
        private prpseq?: number,
        private agent?: string,
        private loccod?: string,
        private addnot?: string,
        private count?: number
    ) { }

    get Quonum(){
        return this.quonum;
    }

    set Quonum(quonum : number){
        this.quonum = quonum;
    }

    get Pprnum(){
        return this.pprnum;
    }

    set Pprnum(pprnum : string){
        this.pprnum = pprnum;
    }

    get Prpseq(){
        return this.prpseq;
    }

    set Prpseq(prpseq : number){
        this.prpseq = prpseq;
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

    get Addnot(){
        return this.addnot;
    }

    set Addnot(addnot : string){
        this.addnot = addnot;
    }

    get Count(){
        return this.prpseq;
    }

    set Count(count : number){
        this.count = count;
    }

}