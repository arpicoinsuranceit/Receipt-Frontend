export class ChildrenInq {
    constructor(private age?: number, private name?: string, private cibc?: string,
        private dob?: string, private hbc?: string, private hrbc?: string, 
        private relation?: string, private sex?: string, private suhrbc?: string) { }

    get Age() {
        return this.age;
    }

    set Age(age: number) {
        this.age = age;
    }

    get Name() {
        return this.name;
    }

    set Name(name: string) {
        this.name = name;
    }
    get Cibc() {
        return this.cibc;
    }

    set Cibc(cibc: string) {
        this.cibc = cibc;
    }
    get Dob() {
        return this.dob;
    }

    set Dob(dob: string) {
        this.dob = dob;
    }
    get Hbc() {
        return this.hbc;
    }

    set Hbc(hbc: string) {
        this.hbc = hbc;
    }
    get Hrbc() {
        return this.hrbc;
    }

    set Hrbc(hrbc: string) {
        this.hrbc = hrbc;
    }
    get Relation() {
        return this.relation;
    }

    set Relation(relation: string) {
        this.relation = relation;
    }
    get Sex() {
        return this.sex;
    }

    set Sex(sex: string) {
        this.sex = sex;
    }

    get Suhrbc() {
        return this.suhrbc;
    }

    set Suhrbc(suhrbc: string) {
        this.suhrbc = suhrbc;
    }

}