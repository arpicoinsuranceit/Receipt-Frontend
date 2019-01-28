export class MedicalReqDetailsInq {

    constructor(private additionalNotes?: string,
        private hospital?: string,
        private origin?: string,
        private payAmount?: string,
        private payStatus?: string,
        private recived?: string,
        private testCode?: string,
        private testDate?: string,
        private testName?: string,
        private type?: string) { }

    get AdditionalNotes() {
        return this.additionalNotes;
    }

    set AdditionalNotes(additionalNotes: string) {
        this.additionalNotes = additionalNotes;
    }

    get Hospital() {
        return this.hospital;
    }

    set Hospital(hospital: string) {
        this.hospital = hospital;
    }

    get Origin() {
        return this.origin;
    }

    set Origin(origin: string) {
        this.origin = origin;
    }

    get PayAmount() {
        return this.payAmount;
    }

    set PayAmount(payAmount: string) {
        this.payAmount = payAmount;
    }

    get PayStatus() {
        return this.payStatus;
    }

    set PayStatus(payStatus: string) {
        this.payStatus = payStatus;
    }

    get Recived() {
        return this.recived;
    }

    set Recived(recived: string) {
        this.recived = recived;
    }

    get TestCode() {
        return this.testCode;
    }

    set TestCode(testCode: string) {
        this.testCode = testCode;
    }

    get TestDate() {
        return this.testDate;
    }

    set TestDate(testDate: string) {
        this.testDate = testDate;
    }

    get TestName() {
        return this.testName;
    }

    set TestName(testName: string) {
        this.testName = testName;
    }

    get Type() {
        return this.type;
    }

    set Type(type: string) {
        this.type = type;
    }

}