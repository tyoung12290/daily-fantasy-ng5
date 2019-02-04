import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginService } from '../../services/login.service'
import { User } from '../../models/User'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User ={
    username: '',
    password: '',
    email: ''
  }
  @ViewChild('userForm') form: any;


  constructor(private loginService:LoginService) { }

  ngOnInit() {
  }

  login({value, valid}: {value: User, valid:boolean}){
    if(!valid){
      console.log('Form is not valid')
    }else {
      console.log(value.username)
      this.user = value;
      console.log(this.user.username)
      this.loginService.login(value);
      this.form.reset();
    }
  }

}
