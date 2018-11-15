export class MedicalRequirementsDto{
    constructor(private mediCode?:string , private mediName?:string,private insType?:string,private addNote?:string){
    }

    get MediCode(){
        return this.mediCode;
    }

    set MediCode(mediCode:string){
        this.mediCode=mediCode;
    }

    get MediName(){
        return this.mediName;
    }

    set MediName(mediName:string){
        this.mediName=mediName;
    }

    get InsType(){
        return this.insType;
    }

    set InsType(insType:string){
        this.insType=insType;
    }

    get AddNote(){
        return this.addNote;
    }

    set AddNote(addNote:string){
        this.addNote=addNote;
    }

}
