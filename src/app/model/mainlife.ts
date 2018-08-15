export class MainLife {
    constructor(private _mTitle?: string,
        private _mName?: string,
        private _mNic?: string,
        private _mEmail?: string,
        private _mGender?: string,
        private _mDob?: string,
        private _mAge?: number,
        private _mSmoking?: string,
        private _mMobile?: string,
        private _mOccupation?: string,
        private _mCivilStatus?:string,
        private _mCustomerCode? : string){}

    
    get _MTitle(){
        return this._mTitle;
    }

    get _MName(){
        return this._mName;
    }

    get _MNic(){
        return this._mNic;
    }

    get _MEmail(){
        return this._mEmail;
    }

    get _MGender(){
        return this._mGender;
    }

    get _MDob(){
        return this._mDob;
    }

    get _MAge(){
        return this._mAge;
    }

    get _MSmoking(){
        return this._mSmoking;
    }

    get _MMobile(){
        return this._mMobile;
    }

    get _MOccupation(){
        return this._mOccupation;
    }

    get _MCivilStatus(){
        return this._mCivilStatus;
    }

    get _MCustomerCode(){
        return this._mCustomerCode;
    }

    set _MTitle(_mTitle  :string){
        this._mTitle=_mTitle;
    }

    set _MName(_mName  :string){
        this._mName=_mName;
    }

    set _MNic(_mNic  :string){
        this._mNic=_mNic;
    }

    set _MEmail(_mEmail  :string){
        this._mEmail=_mEmail;
    }

    set _MGender(_mGender  :string){
        this._mGender=_mGender;
    }

    set _MDob(_mDob  :string){
        this._mDob=_mDob;
    }

    set _MAge(_mAge  :number){
        this._mAge=_mAge;
    }

    set _MSmoking(_mSmoking  :string){
        this._mSmoking=_mSmoking;
    }

    set _MMobile(_mMobile  :string){
        this._mMobile=_mMobile;
    }

    set _MOccupation(_mOccupation  :string){
        this._mOccupation=_mOccupation;
    }

    set _MCivilStatus(_mCivilStatus  :string){
        this._mCivilStatus=_mCivilStatus;
    }

    set _MCustomerCode(_mCustomerCode  :string){
        this._mCustomerCode=_mCustomerCode;
    }

}