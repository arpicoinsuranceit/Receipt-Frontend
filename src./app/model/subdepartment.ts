export class SubDepartment{
    constructor(private subDepartmentId? : number,
        private subDepartmentName? : string){}

        get SubDepartmentId(){
            return this.subDepartmentId;
        }

        set SubDepartmentId(subDepartmentId : number){
            this.subDepartmentId=subDepartmentId;
        }

        get SubDepartmentName(){
            return this.subDepartmentName;
        }

        set SubDepartmentName(subDepartmentName : string){
            this.subDepartmentName=subDepartmentName;
        }

}