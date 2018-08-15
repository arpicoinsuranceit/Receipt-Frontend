export class MainlifeUnderwriteModel {
    constructor( private mainlifeTitle?: string, private mainlifeFullName?: string, private mainlifeNameInitial?: string, private address1?: string
        , private address2?: string, private address3?: string, private dob?: string, private nic?: string, private age?: number
        , private tele?: string, private mobile?: string, private email?: string, private mainlifeCustCode?: string, private mainlifeOccu?: string
        , private bankCode?: string, private bankAccNo?: string, private mainlifeHeight?: string, private mainlifeWeight?: string
        , private mainlifeAgeAdmitted?: string, private mainlifeGender?: string, private civilStatus?: string, private mainlifeSmoke?: string
        , private mainlifePreferedLang?: string) { }

    
    set MainlifeTitle(mainlifeTitle: string) {
        this.mainlifeTitle = mainlifeTitle;
    }

    get MainlifeTitle() {
        return this.mainlifeTitle;
    }

    set MainlifeFullName(mainlifeFullName: string) {
        this.mainlifeFullName = mainlifeFullName;
    }

    get MainlifeFullName() {
        return this.mainlifeFullName;
    }

    set MainlifeNameInitial(mainlifeNameInitial: string) {
        this.mainlifeNameInitial = mainlifeNameInitial;
    }

    get MainlifeNameInitial() {
        return this.mainlifeNameInitial;
    }

    set Address1(address1: string) {
        this.address1 = address1;
    }

    get Address1() {
        return this.address1;
    }

    set Address2(address2: string) {
        this.address2 = address2;
    }

    get Address2() {
        return this.address2;
    }

    set Address3(address3: string) {
        this.address3 = address3;
    }

    get Address3() {
        return this.address3;
    }

    set Dob(dob: string) {
        this.dob = dob;
    }

    get Dob() {
        return this.dob;
    }

    set Nic(nic: string) {
        this.nic = nic;
    }

    get Nic() {
        return this.nic;
    }


    set Age(age: number) {
        this.age = age;
    }

    get Age() {
        return this.age;
    }

    set Tele(tele: string) {
        this.tele = tele;
    }

    get Tele() {
        return this.tele;
    }

    set Mobile(mobile: string) {
        this.mobile = mobile;
    }

    get Mobile() {
        return this.mobile;
    }

    set Email(email: string) {
        this.email = email;
    }

    get Email() {
        return this.email;
    }

    set MainlifeCustCode(mainlifeCustCode: string) {
        this.mainlifeCustCode = mainlifeCustCode;
    }

    get MainlifeCustCode() {
        return this.mainlifeCustCode;
    }

    set MainlifeOccu(mainlifeOccu: string) {
        this.mainlifeOccu = mainlifeOccu;
    }

    get MainlifeOccu() {
        return this.mainlifeOccu;
    }

    set BankCode(bankCode: string) {
        this.bankCode = bankCode;
    }

    get BankCode() {
        return this.bankCode;
    }

    set BankAccNo(bankAccNo: string) {
        this.bankAccNo = bankAccNo;
    }

    get BankAccNo() {
        return this.bankAccNo;
    }

    set MainlifeHeight(height: string) {
        this.mainlifeHeight = height;
    }

    get MainlifeHeight() {
        return this.mainlifeHeight;
    }

    set MainlifeWeight(weight: string) {
        this.mainlifeWeight = weight;
    }

    get MainlifeWeight() {
        return this.mainlifeWeight;
    }

    set MainlifeAgeAdmitted(mainlifeAgeAdmitted: string) {
        this.mainlifeAgeAdmitted = mainlifeAgeAdmitted;
    }

    get MainlifeAgeAdmitted() {
        return this.mainlifeAgeAdmitted;
    }

    set MainlifeGender(mainlifeGender: string) {
        this.mainlifeGender = mainlifeGender;
    }

    get MainlifeGender() {
        return this.mainlifeGender;
    }

    set CivilStatus(civilStatus: string) {
        this.civilStatus = civilStatus;
    }

    get CivilStatus() {
        return this.civilStatus;
    }

    set MainlifeSmoke(mainlifeSmoke: string) {
        this.mainlifeSmoke = mainlifeSmoke;
    }

    get MainlifeSmoke() {
        return this.mainlifeSmoke;
    }

    set MainlifePreferedLang(mainlifePreferedLang: string) {
        this.mainlifePreferedLang = mainlifePreferedLang;
    }

    get MainlifePreferedLang() {
        return this.mainlifePreferedLang;
    }


}