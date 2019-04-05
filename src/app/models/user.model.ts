
export class User {
  public email: string;
  public photoURL?: string;
  public firstName?: string;
  public lastName?: string;
  public password?: string;
  public orders?: object;
  public confirmPassword?: string;
  public uid?: string;

  constructor(authData) {
    if ( authData != null ) {
      this.uid = authData.uid ? authData.uid : '';
      this.email = authData.email ? authData.email : '';
      this.firstName = authData.firstName ? authData.firstName : '';
      this.lastName = authData.lastName ? authData.lastName : '';
    }
  }

}
