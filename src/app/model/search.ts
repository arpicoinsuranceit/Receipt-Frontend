export class SearchModel {

    constructor(private custName?: string, private nic?: string, private polnum?: string, private pprnum?: string, private quonum?: string, private product?: string, private seqNum ? : number ) { }

    get CustName() {
        return this.custName;
    }
    set CustName(custName: string) {
        this.custName = custName;
    }
    get Nic() {
        return this.nic;
    }
    set Nic(nic: string) {
        this.nic = nic;
    }
    get Polnum() {
        return this.polnum;
    }
    set Polnum(polnum: string) {
        this.polnum = polnum;
    }
    get Pprnum() {
        return this.pprnum;
    }
    set Pprnum(pprnum: string) {
        this.pprnum = pprnum;
    }
    get Quonum() {
        return this.quonum;
    }
    set Quonum(quonum: string) {
        this.quonum = quonum;
    }

    get Product(){
        return this.product;
    }

    set Product(product : string){
        this.product = product;
    }

    get SeqNum(){
        return this.seqNum;
    }

    set SeqNum(seqNum : number){
        this.seqNum = seqNum;
    }

}