export class WorkflowProposal {

    public constructor(private polNum?: string, private pprNum?: string, private plan?: string, private status?: string, private branch?: string,
        private agent?: string, private comDate?: string, private expDate?: string, private bsa?: number, private totprm?: number
        , private term?: number, private frequancy?: string, private mainLifeDto?: WorkflowProposalMainLife,
        private spouseDto?: WorkflowProposalSpouse, private childrenDtos?: WorkflowProposalChildren[],
        private benefictDetailsMain?: WorkflowProposalBenefictDetail[], private benefictDetailsSpouse?: WorkflowProposalBenefictDetail[],
        private benefictDetailsChildren?: WorkflowProposalBenefictDetail[]) { }

    get PolNum() {
        return this.polNum;
    }

    set PolNum(polnum: string) {
        this.polNum = polnum;
    }

    get PprNum() {
        return this.pprNum;
    }

    set PprNum(pprNum: string) {
        this.pprNum = pprNum;
    }

    get Plan() {
        return this.plan;
    }

    set Plan(plan: string) {
        this.plan = plan;
    }

    get Status() {
        return this.status;
    }

    set Status(status: string) {
        this.status = status;
    }


    get Branch() {
        return this.branch;
    }

    set Branch(branch: string) {
        this.branch = branch;
    }

    get Agent() {
        return this.agent;
    }

    set Agent(agent: string) {
        this.agent = agent;
    }

    get ComDate() {
        return this.comDate;
    }

    set ComDate(comDate: string) {
        this.comDate = comDate;
    }

    get ExpDate() {
        return this.expDate;
    }

    set ExpDate(expDate: string) {
        this.expDate = expDate;
    }

    get Bsa() {
        return this.bsa;
    }

    set Bsa(bsa: number) {
        this.bsa = bsa;
    }

    get Totprm() {
        return this.totprm;
    }

    set Totprm(totprm: number) {
        this.totprm = totprm;
    }

    get Term() {
        return this.term;
    }

    set Term(term: number) {
        this.term = term;
    }


    get Frequancy() {
        return this.frequancy;
    }

    set Frequancy(frequancy: string) {
        this.frequancy = frequancy;
    }

    get MainLifeDto() {
        return this.mainLifeDto;
    }

    set MainLifeDto(mainLifeDto: WorkflowProposalMainLife) {
        this.mainLifeDto = mainLifeDto;
    }

    get SpouseDto() {
        return this.spouseDto;
    }

    set SpouseDto(spouseDto: WorkflowProposalSpouse) {
        this.spouseDto = spouseDto;
    }

    get ChildrenDtos() {
        return this.childrenDtos;
    }

    set ChildrenDtos(childrenDtos: WorkflowProposalChildren[]) {
        this.childrenDtos = childrenDtos;
    }

    get BenefictDetailsMain() {
        return this.benefictDetailsMain;
    }

    set BenefictDetailsMain(benefictDetailsMain: WorkflowProposalBenefictDetail[]) {
        this.benefictDetailsMain = benefictDetailsMain;
    }

    get BenefictDetailsSpouse() {
        return this.benefictDetailsSpouse;
    }

    set BenefictDetailsSpouse(benefictDetailsSpouse: WorkflowProposalBenefictDetail[]) {
        this.benefictDetailsSpouse = benefictDetailsSpouse;
    }

    get BenefictDetailsChildren() {
        return this.benefictDetailsChildren;
    }

    set BenefictDetailsChildren(benefictDetailsChildren: WorkflowProposalBenefictDetail[]) {
        this.benefictDetailsChildren = benefictDetailsChildren;
    }


}

export class WorkflowProposalMainLife {

    public constructor(private fullName?: string,
        private nameIni?: string,
        private address?: string,
        private nic?: string,
        private mobile?: string,
        private phone?: string,
        private previlageCard?: string,
        private email?: string,
        private dob?: string,
        private age?: number,
        private sex?: string,
        private civilStatus?: string,
        private occupation?: string) { }


    get FullName() {
        return this.fullName;
    }

    set FullName(fullName: string) {
        this.fullName = fullName;
    }

    get NameIni() {
        return this.nameIni;
    }

    set NameIni(nameIni: string) {
        this.nameIni = nameIni;
    }

    get Address() {
        return this.address;
    }

    set Address(address: string) {
        this.address = address;
    }

    get Nic() {
        return this.nic;
    }

    set Nic(nic: string) {
        this.nic = nic;
    }

    get Mobile() {
        return this.mobile;
    }

    set Mobile(mobile: string) {
        this.mobile = mobile;
    }

    get Phone() {
        return this.phone;
    }

    set Phone(phone: string) {
        this.phone = phone;
    }

    get PrevilageCard() {
        return this.previlageCard;
    }

    set PrevilageCard(previlageCard: string) {
        this.previlageCard = previlageCard;
    }

    get Email() {
        return this.email;
    }

    set Email(email: string) {
        this.email = email;
    }

    get Dob() {
        return this.dob;
    }

    set Dob(dob: string) {
        this.dob = dob;
    }

    get Age() {
        return this.age;
    }

    set Age(age: number) {
        this.age = age;
    }

    get Sex() {
        return this.sex;
    }

    set Sex(sex: string) {
        this.sex = sex;
    }
    get CivilStatus() {
        return this.civilStatus;
    }

    set CivilStatus(civilStatus: string) {
        this.civilStatus = civilStatus;
    }
    get Occupation() {
        return this.occupation;
    }

    set Occupation(occupation: string) {
        this.occupation = occupation;
    }
}

export class WorkflowProposalSpouse {

    constructor(private fullName?: string,
        private nameIni?: string,
        private nic?: string,
        private dob?: string,
        private age?: number,
        private occupation?: string) { }

    get FullName() {
        return this.fullName;
    }

    set FullName(fullName: string) {
        this.fullName = fullName;
    }

    get NameIni() {
        return this.nameIni;
    }

    set NameIni(nameIni: string) {
        this.nameIni = nameIni;
    }

    get Nic() {
        return this.nic;
    }

    set Nic(nic: string) {
        this.nic = nic;
    }

    get Dob() {
        return this.dob;
    }

    set Dob(dob: string) {
        this.dob = dob;
    }

    get Age() {
        return this.age;
    }

    set Age(age: number) {
        this.age = age;
    }

    get Occupation() {
        return this.occupation;
    }

    set Occupation(occupation: string) {
        this.occupation = occupation;
    }
}

export class WorkflowProposalChildren {

    constructor(private fullName?: string,
        private relation?: string,
        private dob?: string,
        private age?: number,
        private cibc?: boolean,
        private hcbc?: boolean,
        private hbc?: boolean) { }


    get FullName() {
        return this.fullName;
    }

    set FullName(fullName: string) {
        this.fullName = fullName;
    }

    get Relation() {
        return this.relation;
    }

    set Relation(relation: string) {
        this.relation = relation;
    }

    get Dob() {
        return this.dob;
    }

    set Dob(dob: string) {
        this.dob = dob;
    }
    get Age() {
        return this.age;
    }

    set Age(age: number) {
        this.age = age;
    }

    get Cibc() {
        return this.cibc;
    }

    set Cibc(cibc: boolean) {
        this.cibc = cibc;
    }

    get Hcbc() {
        return this.hcbc;
    }

    set Hcbc(hcbc: boolean) {
        this.hcbc = hcbc;
    }

    get Hbc() {
        return this.hbc;
    }

    set Hbc(hbc: boolean) {
        this.hbc = hbc;
    }
}

export class WorkflowProposalBenefictDetail {
    constructor(private benefictCode?: string,
        private benefictNAme?: string,
        private sumassured?: number,
        private premium?: number) { }

    get BenefictCode() {
        return this.benefictCode;
    }

    set BenefictCode(benefictCode: string) {
        this.benefictCode = benefictCode;
    }
    get BenefictNAme() {
        return this.benefictNAme;
    }

    set BenefictNAme(benefictNAme: string) {
        this.benefictNAme = benefictNAme;
    }
    get Sumassured() {
        return this.sumassured;
    }

    set Sumassured(sumassured: number) {
        this.sumassured = sumassured;
    }
    get Premium() {
        return this.premium;
    }

    set Premium(premium: number) {
        this.premium = premium;
    }
}