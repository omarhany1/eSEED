import { Component, OnInit } from '@angular/core';
import { APIData, User } from '../../../@core/service/models/api.data.structure';
import { APIService } from '../../../@core/service/api.service';
import { error } from 'protractor';
import { Routes,Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './template/login.component.html',
  styleUrls: ['./template/login.component.css']
})
export class LoginComponent implements OnInit {
  public email;
  public password;
  public loginMessage;

  constructor(private _apiService:APIService , private router: Router  ) { }

  ngOnInit() {

  }

  /*loginClick(){
    const user = <User>{};
    user.email = this.email;
    user.password = this.password;
    if(this.email != null && this.password != null){
      this._apiService.login(user).subscribe((apiresponse: APIData)=>{
        this.loginMessage = apiresponse.msg;
        if( apiresponse.msg.includes('Welcome') ){
          localStorage.setItem('token', apiresponse.data);
          this._navBarService.setUserLoggedin(true);
          this.router.navigate(['home']); 
        } else {
          this.loginMessage = apiresponse.msg;
        }
      } , (error: APIData) => {
        this.loginMessage = error.msg;
      })
  } else
    this.loginMessage = 'Username or Password Can not Be Empty ';
  }*/
  
  

}
