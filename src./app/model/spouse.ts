export class Spouse{
    constructor(private _sActive?: boolean,
    private _sTitle?: string,
    private _sName?: string,
    private _sNic?: string,
    private _sGender?: string,
    private _sDob?: string,
    private _sAge?: number,
    private _sSmoking?: string,
    private _sOccupation?: string,
    private _sCustomerCode? : string){}

    get _SActive(){
        return this._sActive;
    }

    get _STitle(){
        return this._sTitle;
    }

    get _SName(){
        return this._sName;
    }

    get _SNic(){
        return this._sNic;
    }

    get _SGender(){
        return this._sGender;
    }

    get _SDob(){
        return this._sDob;
    }

    get _SAge(){
        return this._sAge;
    }

    get _SSmoking(){
        return this._sSmoking;
    }

    get _SOcuupation(){
        return this._sOccupation;
    }

    get _SCustomerCode(){
        return this._sCustomerCode;
    }


    set _SActive(_sActive : boolean){
        this._sActive=_sActive;
    }

    set _STitle(_sTitle : string){
        this._sTitle=_sTitle;
    }

    set _SName(_sName : string){
        this._sName=_sName;
    }

    set _SNic(_sNic : string){
        this._sNic=_sNic;
    }

    set _SGender(_sGender : string){
        this._sGender=_sGender;
    }

    set _SDob(_sDob  :string){
        this._sDob=_sDob;
    }

    set _SAge(_sAge  :number){
        this._sAge=_sAge;
    }

    set _SSmoking(_sSmoking : string){
        this._sSmoking=_sSmoking;
    }

    set _SOcuupation(_sOccupation : string){
        this._sOccupation=_sOccupation;
    }

    set _SCustomerCode(_sCustomerCode:string){
        this._sCustomerCode=_sCustomerCode;
    }

}