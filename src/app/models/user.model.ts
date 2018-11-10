export class User{

  constructor(
    public firstName: String,
    public lastName: String,
    public email: String,
    public userType: String,
    public password:String
  ) {  }

}

export class LoginUser{

  constructor(
    public email: String,
    public password: String,
  ) {  }

}

export class FullProfile{

  constructor(
    public firstName: String,
    public lastName: String,
    public email: String,
    public buddies: String,
    public city: String,
    public state: String,
    public country: String,
    public isOnline: String
  ) {  }

}