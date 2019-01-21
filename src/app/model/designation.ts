export class Designation{
    constructor(private desCode?:string,private name?:string,private from?:string,private to?:string){}

    get DesCode(){
        return this.desCode;
    }

    set DesCode(desCode:string){
        this.desCode=desCode;
    }

    get Name(){
        return this.name;
    }

    set Name(name:string){
        this.name=name;
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