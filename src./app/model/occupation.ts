
export class Occupation{

	constructor(private ocupationid? : number,
		private ocupationCode? : string,
		private ocupationName? : string,
		private ocupationCreateBy? : string,
		private ocupationCreateDate? : string,
		private ocupationModifyBy? : string,
		private ocupationModifyDate? : string,
		private ocupationCombine? : string){}

	
	get OccupationId(){
		return this.ocupationid;
	}

	get OccupationCode(){
		return this.ocupationCode;
	}

	get OccupationName(){
		return this.ocupationName;
	}

	get OccupationCreateBy(){
		return this.ocupationCreateBy;
	}

	get OccupationCreateDate(){
		return this.ocupationCreateDate;
	}

	get OccupationModifyBy(){
		return this.ocupationModifyBy;
	}

	get OccupationModifyDate(){
		return this.ocupationModifyDate;
	}
	
	set OccupationId(ocupationid : number){
		this.ocupationid=ocupationid;
	}

	set OccupationCode(ocupationCode : string){
		this.ocupationCode=ocupationCode;
	}

	set OccupationName(ocupationName : string){
		this.ocupationName=ocupationName;
	}

	set OccupationCreateBy(ocupationCreateBy : string){
		this.ocupationCreateBy=ocupationCreateBy;
	}

	set OccupationCreateDate(ocupationCreateDate : string){
		this.ocupationCreateDate=ocupationCreateDate;
	}

	set OccupationModifyBy(ocupationModifyBy : string){
		this.ocupationModifyBy=ocupationModifyBy;
	}

	set OccupationModifyDate(ocupationModifyDate : string){
		this.ocupationModifyDate=ocupationModifyDate;
	} 

	get OcupationCombine (){
        return this.ocupationCombine;
    }
    set OcupationCombine (ocupationCombine : string){
        this.ocupationCombine = ocupationCombine;
    }
	
}