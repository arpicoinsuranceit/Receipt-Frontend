export class Education{
    constructor(private qualification?:string,private year?:string,private grade?:string){}

    get Qualification(){
        return this.qualification;
    }

    set Qualification(qualification:string){
        this.qualification=qualification;
    }

    get Year(){
        return this.year;
    }

    set Year(year:string){
        this.year=year;
    }

    get Grade(){
        return this.grade;
    }

    set Grade(grade:string){
        this.grade=grade;
    }

}