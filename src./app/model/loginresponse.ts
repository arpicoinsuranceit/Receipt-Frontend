import { MenuModel } from './menumodel';
import { ThrowStmt } from "@angular/compiler";

export class LoginResponse{

    
    constructor (private isLogin? : boolean, private isInactive? : boolean,
        private isFail? : boolean, private isLock? : boolean, private isExpired? : boolean,
        private isNeedChange? : boolean, private jwtToken? : string, private failCount? : number, private menuDtos ? : MenuModel[], private userName? : string)
    {

    }
    
    get IsLogin () {
        return this.isLogin;
    }

    set IsLogin (isLogin : boolean) {
        this.isLogin = isLogin;
    }

    get IsInactive () {
        return this.isInactive;
    }

    set IsInactive (isInactive : boolean) {
        this.isInactive = isInactive;
    }

    get IsFail () {
        return this.isFail;
    }

    set IsFail (isFail : boolean) {
        this.isFail = isFail;
    }

    get IsLock () {
        return this.isLock;
    }

    set IsLock (isLock : boolean) {
        this.isLock = isLock;
    }

    get IsExpired () {
        return this.isExpired;
    }

    set IsExpired (isExpired : boolean) {
        this.isExpired = isExpired;
    }

    get IsNeedChange () {
        return this.isNeedChange;
    }

    set IsNeedChange (isNeedChange : boolean) {
        this.isNeedChange = isNeedChange;
    }

    get JwtToken () {
        return this.jwtToken;
    }

    set JwtToken (jwtToken : string) {
        this.jwtToken = jwtToken;
    }

    get FailCount () {
        return this.failCount;
    }

    set FailCount (failCount : number) {
        this.failCount = failCount;
    }

    get MenuDtos () {
        return this.menuDtos;
    }

    set MenuDtos (menuDtos : MenuModel[]) {
        this.menuDtos = menuDtos;
    }

    get UserName () {
        return this.userName;
    }

    set UserName (userName : string) {
        this.userName = userName;
    }

    

}