export class Department{
    constructor(private departmentId? : number,
        private departmentName? : string){}

        get DepartmentId(){
            return this.departmentId;
        }

        set DepartmentId(departmentId : number){
            this.departmentId=departmentId;
        }

        get DepartmentName(){
            return this.departmentName;
        }

        set DepartmentName(departmentName : string){
            this.departmentName=departmentName;
        }

}