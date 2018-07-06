export class ChildModel{
    
    constructor (private name? : string, private relationship? : string,private dob? : string , private age? : number,
        private nic? : string,private gender? : string,private isGetHcbiOrHcbf? : string,private isGetShcbi? : string
        ,private isGetHbc? : string,private isGetCic? : string){

        }

    get Name (){
        return this.name;
    }

    set Name (name : string){
        this.name = name;
    }

    get Relationship () {
        return this.relationship;
    }

    set Relationship (relationship : string) {
        this.relationship = relationship;
    }

    get DOB () {
        return this.dob;
    }

    set DOB (dob : string) {
        this.dob = dob;
    }

    get Age () {
        return this.age;
    }

    set Age (age : number) {
        this.age = age;
    }

    get Nic () {
        return this.nic;
    }

    set Nic (nic : string) {
        this.nic = nic;
    }

    get Gender () {
        return this.gender;
    }

    set Gender (gender : string) {
        this.gender = gender;
    }

    get IsGetHcbiOrHcbf () {
        return this.isGetHcbiOrHcbf;
    }

    set IsGetHcbiOrHcbf (isGetHcbiOrHcbf : string) {
        this.isGetHcbiOrHcbf = isGetHcbiOrHcbf;
    }

    get IsGetShcbi () {
        return this.isGetShcbi;
    }

    set IsGetShcbi (isGetShcbi : string) {
        this.isGetShcbi = isGetShcbi;
    }

    get IsGetHbc () {
        return this.isGetHbc;
    }

    set IsGetHbc (isGetHbc : string) {
        this.isGetHbc = isGetHbc;
    }

    get IsGetCic () {
        return this.isGetCic;
    }

    set IsGetCic (isGetCic : string) {
        this.isGetCic = isGetCic;
    }
}