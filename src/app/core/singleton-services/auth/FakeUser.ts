export class FakeUser {
    sub: string;
    userName: string;
    name: string;
    email: string;
    isSynthetic: boolean;
    theaterCode: string;
    bearerToken: string;

    constructor(sub: string, userName: string, email: string, name: string, isSynthetic: boolean, theaterCode: string, bearerToken: string){
        this.sub = sub;
        this.userName = userName;
        this.email = email;
        this.name = name;
        this.isSynthetic = isSynthetic;
        this.theaterCode = theaterCode;
        this.bearerToken = bearerToken;
      }
}