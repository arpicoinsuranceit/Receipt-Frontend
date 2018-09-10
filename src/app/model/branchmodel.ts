export class BranchModel{
    constructor(private id? : string, private description? : string){}

    get Id(){
        return this.id;
    }

    set Id(id : string) {
        this.id = id;
    }

    get Description(){
        return this.description;
    }

    set Description(description : string) {
        this.description = description;
    }
}