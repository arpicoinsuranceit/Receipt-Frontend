export class ChildModel{
    
    constructor (private _cActive?: boolean,private _cName? : string, private _cTitle? : string,private relationship? : string,private _cDob? : string , private _cAge? : number,
        private _cNic? : string,private gender? : string,private isGetHcbiOrHcbf? : string,private isGetShcbi? : string
        ,private isGetHbc? : string,private isGetCic? : string,private _cCibc?: boolean,
        private _cHrbic?: boolean,
        private _cHrbfc?: boolean,
        private _cSuhrbc?: boolean,
        private _cShcbfc?: boolean,
        private _cHbc?: boolean){

        }

    get _CName (){
        return this._cName;
    }

    set _CName (name : string){
        this._cName = name;
    }

    get _CTitle () {
        return this._cTitle;
    }

    set _CTitle (relationship : string) {
        this._cTitle = relationship;
    }

    get _CActive () {
        return this._cActive;
    }

    set _CActive (_cActive : boolean) {
        this._cActive = _cActive;
    }

    get Relationship () {
        return this.relationship;
    }

    set Relationship (relationship : string) {
        this.relationship = relationship;
    }

    get _CDob () {
        return this._cDob;
    }

    set _CDob (dob : string) {
        this._cDob = dob;
    }

    get _CAge () {
        return this._cAge;
    }

    set _CAge (age : number) {
        this._cAge = age;
    }

    get _CNic () {
        return this._cNic;
    }

    set _CNic (nic : string) {
        this._cNic = nic;
    }

    get Gender () {
        return this.gender;
    }

    set Gender (gender : string) {
        this.gender = gender;
    }

    get IsGetHcbiOrHcbf () {
        return this.isGetHcbiOrHcbf;
    }

    set IsGetHcbiOrHcbf (isGetHcbiOrHcbf : string) {
        this.isGetHcbiOrHcbf = isGetHcbiOrHcbf;
    }

    get IsGetShcbi () {
        return this.isGetShcbi;
    }

    set IsGetShcbi (isGetShcbi : string) {
        this.isGetShcbi = isGetShcbi;
    }

    get IsGetHbc () {
        return this.isGetHbc;
    }

    set IsGetHbc (isGetHbc : string) {
        this.isGetHbc = isGetHbc;
    }

    get IsGetCic () {
        return this.isGetCic;
    }

    set IsGetCic (isGetCic : string) {
        this.isGetCic = isGetCic;
    }

    get _CCibc(){
        return this._cCibc;
    }

    set _CCibc(_cCibc:boolean){
        this._cCibc=_cCibc;
    }

    get _CHrbic(){
        return this._cHrbic;
    }

    set _CHrbic(_cHrbic:boolean){
        this._cHrbic=_cHrbic;
    }

    get _CHrbfc(){
        return this._cHrbfc;
    }

    set _CHrbfc(_cHrbfc:boolean){
        this._cHrbfc=_cHrbfc;
    }

    get _CSuhrbc(){
        return this._cSuhrbc;
    }

    set _CSuhrbc(_cSuhrbc:boolean){
        this._cSuhrbc=_cSuhrbc;
    }

    get _CShcbfc(){
        return this._cShcbfc;
    }

    set _CShcbfc(_cSuhrbfc:boolean){
        this._cShcbfc=_cSuhrbfc;
    }

    get _CHbc(){
        return this._cHbc;
    }

    set _CHbc(_cHbc:boolean){
        this._cHbc=_cHbc;
    }
}