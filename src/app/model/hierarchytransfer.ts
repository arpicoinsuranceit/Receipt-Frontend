export class HierarchyTransfer{
    constructor(private masterSalesC?:string,private name?:string,private cls?:string,private from?:string,
        private to?:string){
    }

    get MasterSalesC(){
        return this.masterSalesC;
    }

    set MasterSalesC(masterSalesC:string){
        this.masterSalesC=masterSalesC;
    }

    get Name(){
        return this.name;
    }

    set Name(name:string){
        this.name=name;
    }

    get Cls(){
        return this.cls;
    }

    set Cls(cls:string){
        this.cls=cls;
    }

    get From(){
        return this.from;
    }

    set From(from:string){
        this.from=from;
    }

    get To(){
        return this.to;
    }

    set To(to:string){
        this.to=to;
    }

}