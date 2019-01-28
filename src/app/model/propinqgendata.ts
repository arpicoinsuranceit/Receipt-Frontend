export class PropInqGenData {

    constructor(private proposalNo?: string, private policyNo?: string, private commencementDate?: string, private branchCode?: string,
        private productCode?: string, private productName?: string, private expDate?: string, private seqNo?: string,
        private mainLifesex?: string, private mainLifeName?: string, private mainLifeNameIni?: string, private mainlifeAddress?: string,
        private mainLifeNic?: string, private mainLifeTel?: string, private mainLifeMob?: string, private mainLifeEmail?: string,
        private mainLifeDob?: string, private mainLifeNextAge?: number, private mainLifeOcu?: string, private mainLifeStatus?: string,
        private bankNo?: string, private accountNo?: string, private previlageCardNo?: string, private spouseName?: string,
        private spouseNameIni?: string, private spouseNic?: string, private spouseDob?: string, private spouseocu?: string,
        private payTerm?: string, private targetPremium?: number, private relTerm?: number, private topTerm?: number,
        private basicSum?: number, private premiumForBasicSum?: number, private totalPremiun?: number, private quotationNum?: string,
        private proposalStatus?: string, private proposalDescription?: string, private mainLifeSumAtRisk?: number, private spouseSumAtRisk?: number) { }


    get ProposalNo() {
        return this.proposalNo;
    }

    set ProposalNo(proposalNo: string) {
        this.proposalNo = proposalNo;
    }

    get PolicyNo() {
        return this.policyNo;
    }

    set PolicyNo(policyNo: string) {
        this.policyNo = policyNo;
    }

    get CommencementDate() {
        return this.commencementDate;
    }

    set CommencementDate(commencementDate: string) {
        this.commencementDate = commencementDate;
    }

    get BranchCode() {
        return this.branchCode;
    }

    set BranchCode(branchCode: string) {
        this.branchCode = branchCode;
    }

    get ProductCode() {
        return this.productCode;
    }

    set ProductCode(productCode: string) {
        this.productCode = productCode;
    }

    get ProductName() {
        return this.productName;
    }

    set ProductName(productName: string) {
        this.productName = productName;
    }

    get ExpDate() {
        return this.expDate;
    }

    set ExpDate(expDate: string) {
        this.expDate = expDate;
    }

    get SeqNo() {
        return this.seqNo;
    }

    set SeqNo(seqNo: string) {
        this.seqNo = seqNo;
    }


    get MainLifesex() {
        return this.mainLifesex;
    }

    set MainLifesex(mainLifesex: string) {
        this.mainLifesex = mainLifesex;
    }

    get MainLifeNameIni() {
        return this.mainLifeNameIni;
    }

    set MainLifeNameIni(mainLifeNameIni: string) {
        this.mainLifeNameIni = mainLifeNameIni;
    }

    get MainlifeAddress() {
        return this.mainlifeAddress;
    }

    set MainlifeAddress(mainlifeAddress: string) {
        this.mainlifeAddress = mainlifeAddress;
    }

    get MainLifeNic() {
        return this.mainLifeNic;
    }

    set MainLifeNic(mainLifeNic: string) {
        this.mainLifeNic = mainLifeNic;
    }

    get MainLifeTel() {
        return this.mainLifeTel;
    }

    set MainLifeTel(mainLifeTel: string) {
        this.mainLifeTel = mainLifeTel;
    }

    get MainLifeMob() {
        return this.mainLifeMob;
    }

    set MainLifeMob(mainLifeMob: string) {
        this.mainLifeMob = mainLifeMob;
    }

    get MainLifeEmail() {
        return this.mainLifeEmail;
    }

    set MainLifeEmail(mainLifeEmail: string) {
        this.mainLifeEmail = mainLifeEmail;
    }

    get MainLifeDob() {
        return this.mainLifeDob;
    }

    set MainLifeDob(mainLifeDob: string) {
        this.mainLifeDob = mainLifeDob;
    }

    get MainLifeNextAge() {
        return this.mainLifeNextAge;
    }

    set MainLifeNextAge(mainLifeNextAge: number) {
        this.mainLifeNextAge = mainLifeNextAge;
    }

    get MainLifeOcu() {
        return this.mainLifeOcu;
    }

    set MainLifeOcu(mainLifeOcu: string) {
        this.mainLifeOcu = mainLifeOcu;
    }

    get MainLifeStatus() {
        return this.mainLifeStatus;
    }

    set MainLifeStatus(mainLifeStatus: string) {
        this.mainLifeStatus = mainLifeStatus;
    }


    get MainLifeName() {
        return this.mainLifeName;
    }

    set MainLifeName(mainLifeName: string) {
        this.mainLifeName = mainLifeName;
    }

    get BankNo() {
        return this.bankNo;
    }

    set BankNo(bankNo: string) {
        this.bankNo = bankNo;
    }

    get AccountNo() {
        return this.accountNo;
    }

    set AccountNo(accountNo: string) {
        this.accountNo = accountNo;
    }

    get PrevilageCardNo() {
        return this.previlageCardNo;
    }

    set PrevilageCardNo(previlageCardNo: string) {
        this.previlageCardNo = previlageCardNo;
    }

    get SpouseNameIni() {
        return this.spouseNameIni;
    }

    set SpouseNameIni(spouseNameIni: string) {
        this.spouseNameIni = spouseNameIni;
    }

    get SpouseNic() {
        return this.spouseNic;
    }

    set SpouseNic(spouseNic: string) {
        this.spouseNic = spouseNic;
    }

    get SpouseDob() {
        return this.spouseDob;
    }

    set SpouseDob(spouseDob: string) {
        this.spouseDob = spouseDob;
    }

    get SpouseName() {
        return this.spouseName;
    }

    set SpouseName(spouseName: string) {
        this.spouseName = spouseName;
    }

    get Spouseocu() {
        return this.spouseocu;
    }

    set Spouseocu(spouseocu: string) {
        this.spouseocu = spouseocu;
    }

    get PayTerm() {
        return this.payTerm;
    }

    set PayTerm(payTerm: string) {
        this.payTerm = payTerm;
    }


    get TargetPremium() {
        return this.targetPremium;
    }

    set TargetPremium(targetPremium: number) {
        this.targetPremium = targetPremium;
    }


    get RelTerm() {
        return this.relTerm;
    }

    set RelTerm(relTerm: number) {
        this.relTerm = relTerm;
    }


    get TopTerm() {
        return this.topTerm;
    }

    set TopTerm(topTerm: number) {
        this.topTerm = topTerm;
    }

    get BasicSum() {
        return this.basicSum;
    }

    set BasicSum(basicSum: number) {
        this.basicSum = basicSum;
    }

    get PremiumForBasicSum() {
        return this.premiumForBasicSum;
    }

    set PremiumForBasicSum(premiumForBasicSum: number) {
        this.premiumForBasicSum = premiumForBasicSum;
    }

    get TotalPremiun() {
        return this.totalPremiun;
    }

    set TotalPremiun(totalPremiun: number) {
        this.totalPremiun = totalPremiun;
    }

    get QuotationNum() {
        return this.quotationNum;
    }

    set QuotationNum(quotationNum: string) {
        this.quotationNum = quotationNum;
    }

    get ProposalStatus() {
        return this.proposalStatus;
    }

    set ProposalStatus(proposalStatus: string) {
        this.proposalStatus = proposalStatus;
    }
    
    get ProposalDescription() {
        return this.proposalDescription;
    }

    set ProposalDescription(proposalDescription: string) {
        this.proposalDescription = proposalDescription;
    }

    get MainLifeSumAtRisk() {
        return this.mainLifeSumAtRisk;
    }

    set MainLifeSumAtRisk(mainLifeSumAtRisk: number) {
        this.mainLifeSumAtRisk = mainLifeSumAtRisk;
    }

    get SpouseSumAtRisk() {
        return this.spouseSumAtRisk;
    }

    set SpouseSumAtRisk(spouseSumAtRisk: number) {
        this.spouseSumAtRisk = spouseSumAtRisk;
    }


}