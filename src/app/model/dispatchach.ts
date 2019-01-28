export class DispatchAch{

    constructor(
        private cadsdt?: string,
        private remark?: string,
        private ackdat?: string,
        private agncod?: string,
        private agnnam?: string,
        private cusdat?: string,
        private dspdat?: string
    ){}

    get Cadsdt(){
        return this.cadsdt;
    }

    set Cadsdt(cadsdt : string) {
        this.cadsdt = cadsdt;
    }

    get Remark(){
        return this.remark;
    }

    set Remark(remark : string) {
        this.remark = remark;
    }

    get Ackdat(){
        return this.ackdat;
    }

    set Ackdat(ackdat : string) {
        this.ackdat = ackdat;
    }

    get Agncod(){
        return this.agncod;
    }

    set Agncod(agncod : string) {
        this.agncod = agncod;
    }

    get Agnnam(){
        return this.agnnam;
    }

    set Agnnam(agnnam : string) {
        this.agnnam = agnnam;
    }

    get Cusdat(){
        return this.cusdat;
    }

    set Cusdat(cusdat : string) {
        this.cusdat = cusdat;
    }

    get Dspdat(){
        return this.dspdat;
    }

    set Dspdat(dspdat : string) {
        this.dspdat = dspdat;
    }
}