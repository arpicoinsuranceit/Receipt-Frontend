import { AccountModel } from './accountModel';
import { ExpenseModel } from './expensemodel';

export class MiscellaneousReceiptModel {
    constructor(private branch?: string, private bank?: string, private agent?: string,
        private remark?: string, private paymode?: string, private chqNo?: string, 
        private chqDate?: string, private chqBank?: string, private amount?: number, 
        private amtInWord?: string, private expencess?: ExpenseModel[], private accounts?: AccountModel[]) { }

    
    get Branch (){
        return this.branch;
    }

    set Branch (branch : string) {
        this.branch = branch;
    }

    get Bank (){
        return this.bank;
    }

    set Bank (bank : string) {
        this.bank = bank;
    }

    get Agent (){
        return this.agent;
    }

    set Agent (agent : string) {
        this.agent = agent;
    }

    get Remark (){
        return this.remark;
    }

    set Remark (remark : string) {
        this.remark = remark;
    }

    get Paymode (){
        return this.paymode;
    }

    set Paymode (paymode : string) {
        this.paymode = paymode;
    }

    get ChqNo (){
        return this.chqNo;
    }

    set ChqNo (chqNo : string) {
        this.chqNo = chqNo;
    }

    get ChqDate (){
        return this.chqDate;
    }

    set ChqDate (chqDate : string) {
        this.chqDate = chqDate;
    }

    get ChqBank (){
        return this.chqBank;
    }

    set ChqBank (chqBank : string) {
        this.chqBank = chqBank;
    }

    get Amount (){
        return this.amount;
    }

    set Amount (amount : number) {
        this.amount = amount;
    }

    get AmtInWord (){
        return this.amtInWord;
    }

    set AmtInWord (amtInWord : string) {
        this.amtInWord = amtInWord;
    }

    get Expencess (){
        return this.expencess;
    }

    set Expencess (expencess : ExpenseModel[]) {
        this.expencess = expencess;
    }

    get Accounts (){
        return this.accounts;
    }

    set Accounts (accounts : AccountModel[]) {
        this.accounts = accounts;
    }
}