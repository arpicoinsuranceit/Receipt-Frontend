export class SpouseUnderwriteModel {
    constructor(private spouseTitle?: string, private spouseFullName?: string, private spouseNameInitial?: string
        , private spouseNic?: string, private spouseDob?: string, private spouseAge?: string, private spouseHeight?: string, private spouseWeight?: string
        , private spouseOccupation?: string, private spouseAgeAdmitted?: string, private spouseGender?: string) { }

    set SpouseTitle(spouseTitle: string) {
        this.spouseTitle = spouseTitle;
    }

    get SpouseTitle() {
        return this.spouseTitle;
    }


    set SpouseFullName(spouseFullName: string) {
        this.spouseFullName = spouseFullName;
    }

    get SpouseFullName() {
        return this.spouseFullName;
    }

    set SpouseNameInitial(spouseNameInitial: string) {
        this.spouseNameInitial = spouseNameInitial;
    }

    get SpouseNameInitial() {
        return this.spouseNameInitial;
    }

    set SpouseAge(spouseAge: string) {
        this.spouseAge = spouseAge;
    }

    get SpouseAge() {
        return this.spouseAge;
    }

    set SpouseDob(spouseDob: string) {
        this.spouseDob = spouseDob;
    }

    get SpouseDob() {
        return this.spouseDob;
    }

    set SpouseNic(spouseNic: string) {
        this.spouseNic = spouseNic;
    }

    get SpouseNic() {
        return this.spouseNic;
    }

    set SpouseHeight(spouseHeight: string) {
        this.spouseHeight = spouseHeight;
    }

    get SpouseHeight() {
        return this.spouseHeight;
    }

    set SpouseWeight(spouseWeight: string) {
        this.spouseWeight = spouseWeight;
    }

    get SpouseWeight() {
        return this.spouseWeight;
    }

    set SpouseOccupation(spouseOccupation: string) {
        this.spouseOccupation = spouseOccupation;
    }

    get SpouseOccupation() {
        return this.spouseOccupation;
    }

    set SpouseAgeAdmitted(spouseAgeAdmitted: string) {
        this.spouseAgeAdmitted = spouseAgeAdmitted;
    }

    get SpouseAgeAdmitted() {
        return this.spouseAgeAdmitted;
    }

    set SpouseGender(spouseGender: string) {
        this.spouseGender = spouseGender;
    }

    get SpouseGender() {
        return this.spouseGender;
    }

}