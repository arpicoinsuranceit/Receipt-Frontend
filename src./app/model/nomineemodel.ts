export class NomineeModel{
    
    constructor (private type? : string, private name? : string, private relationship? : string,private dob? : string , private share? : string,
        private nic? : string,private guardianName? : string,private guardianNic? : string,private guardianDOB? : string
        ,private guardianRelation? : string,private nomineeDateofBirth?: string){

        }

    get Type (){
        return this.type;
    }

    set Type (type : string){
        this.type = type;
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

    get Share () {
        return this.share;
    }

    set Share (share : string) {
        this.share = share;
    }

    get Nic () {
        return this.nic;
    }

    set Nic (nic : string) {
        this.nic = nic;
    }

    get GuardianName () {
        return this.guardianName;
    }

    set GuardianName (guardianName : string) {
        this.guardianName = guardianName;
    }

    get GuardianNic () {
        return this.guardianNic;
    }

    set GuardianNic (guardianNic : string) {
        this.guardianNic = guardianNic;
    }

    get GuardianDOB () {
        return this.guardianDOB;
    }

    set GuardianDOB (guardianDOB : string) {
        this.guardianDOB = guardianDOB;
    }

    get GuardianRelation () {
        return this.guardianRelation;
    }

    set GuardianRelation (guardianRelation : string) {
        this.guardianRelation = guardianRelation;
    }

    get NomineeDateofBirth(){
        return this.nomineeDateofBirth;
    }

    set NomineeDateofBirth(nomineeDateofBirth:string){
        this.nomineeDateofBirth=nomineeDateofBirth;
    }
}