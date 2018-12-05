export class CourierModel{   
    constructor(private courierId?: number,private token?: string,private branchCode?: string,private courierStatus?: string,private remark?: string,private createDate?: string
        ,private createBy?: string,private modifyDate?: string,private modifyBy?: string,private toBranch?:string,private receivedBy?:string,private receivedDate?:string
        ,private sendBy?:string,private sendDate?:string,private couType?:string){}


    get CourierId(){
        return this.courierId;
    }

    set CourierId(courierId: number){
        this.courierId=courierId;
    }

    get Token(){
        return this.token;
    }

    set Token(token:string){
        this.token=token;
    }

    get BranchCode(){
        return this.branchCode;
    }

    set BranchCode(branchCode:string){
        this.branchCode=branchCode;
    }

    get CourierStatus(){
        return this.courierStatus;
    }

    set CourierStatus(courierStatus:string){
        this.courierStatus=courierStatus;
    }

    get Remark(){
        return this.remark;
    }

    set Remark(remark:string){
        this.remark=remark;
    }

    get CreateDate(){
        return this.createDate;
    }

    set CreateDate(createDate:string){
        this.createDate=createDate;
    }

    get CreateBy(){
        return this.createBy;
    }

    set CreateBy(createBy:string){
        this.createBy=createBy;
    }

    get ModifyDate(){
        return this.modifyDate;
    }

    set ModifyDate(modifyDate:string){
        this.modifyDate=modifyDate;
    }

    get ModifyBy(){
        return this.modifyBy;
    }

    set ModifyBy(modifyBy:string){
        this.modifyBy=modifyBy;
    }

    get ToBranch(){
        return this.toBranch;
    }

    set ToBranch(toBranch:string){
        this.toBranch=toBranch;
    }

    get ReceivedBy(){
        return this.receivedBy;
    }

    set ReceivedBy(receivedBy:string){
        this.receivedBy=receivedBy;
    }

    get ReceivedDate(){
        return this.receivedDate;
    }

    set ReceivedDate(receivedDate:string){
        this.receivedDate=receivedDate;
    }

    get SendBy(){
        return this.sendBy;
    }

    set SendBy(sendBy:string){
        this.sendBy=sendBy;
    }

    get SendDate(){
        return this.sendDate;
    }

    set SendDate(sendDate:string){
        this.sendDate=sendDate;
    }

    get CouType(){
        return this.couType;
    }

    set CouType(couType:string){
        this.couType=couType;
    }

}