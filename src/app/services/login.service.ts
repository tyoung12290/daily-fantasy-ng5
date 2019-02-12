import { Injectable } from '@angular/core';
import { User } from '../models/User';
@Injectable()
export class LoginService {
  user: User;

  constructor() { }

login(user){
    this.user = user;
  }

  logout(){
    console.log("logged Out");
  }

}
