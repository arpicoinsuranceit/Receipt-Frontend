export class AgnInqAgnListModel{
    constructor(private agncod?: number,
        private agnnam?: string,
        private agnnic?: string,
        private agnsta?: string,
        private sliirg?: string,
        private supvid?: string,
        private agndob?: string,
        private subdcd?: string,
        private agnrdt?: string){}

    get Agncod(){
        return this.agncod;
    }

    set Agncod(agncod:number){
        this.agncod=agncod;
    }

    get Agnnam(){
        return this.agnnam;
    }

    set Agnnam(agnnam:string){
        this.agnnam=agnnam;
    }

    get Agnnic(){
        return this.agnnic;
    }

    set Agnnic(agnnic:string){
        this.agnnic=agnnic;
    }

    get Agnsta(){
        return this.agnsta;
    }

    set Agnsta(agnsta:string){
        this.agnsta=agnsta;
    }

    get Sliirg(){
        return this.sliirg;
    }

    set Sliirg(sliirg:string){
        this.sliirg=sliirg;
    }

    get Supvid(){
        return this.supvid;
    }

    set Supvid(supvid:string){
        this.supvid=supvid;
    }

    get Agndob(){
        return this.agndob;
    }

    set Agndob(agndob:string){
        this.agndob=agndob;
    }

    get Subdcd(){
        return this.subdcd;
    }

    set Subdcd(subdcd:string){
        this.subdcd=subdcd;
    }

    get Agnrdt(){
        return this.agnrdt;
    }

    set Agnrdt(agnrdt:string){
        this.agnrdt=agnrdt;
    }

}