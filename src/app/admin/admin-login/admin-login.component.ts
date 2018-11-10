import { Component, OnInit, Directive,ElementRef,Renderer } from '@angular/core';
import { NgModel,NgForm } from '@angular/forms';
import { Router } from "@angular/router";
import { AdminServiceService } from '../../services/admin-service.service';
import { LoginUser, User } from "../../models/user.model";

import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.less']
})
export class AdminLoginComponent implements OnInit {
  loginUser: LoginUser = new LoginUser('', '');
  passwordType: String = 'password';
  error:Boolean = false;
  errorMessage:String = '';
  constructor(private adminService: AdminServiceService,private router:Router,private title:Title) { }

  ngOnInit() {
    console.log('in AdminLoginComponent');
    this.title.setTitle('Admin:Login')
  }
  changePasswordType(){
    this.passwordType = this.passwordType=='password'?'text':'password';
  }
  
  fetchLoggedUser(){
    if(localStorage.getItem('token')){
     this.adminService.getLoggedInUser()
     .subscribe(
       (data)=>{
          console.log('data: ' , data);
          this.router.navigateByUrl('/admin/home');
          this.adminService.loggedUser.emit(data['obj']);
       },
       error=>{
        this.error = true;
        this.errorMessage = error.error.error.message
       }
     )
    }
  }

  login(signinForm:NgForm){
    console.log('user: ' , this.loginUser);
    this.error = false;
    this.errorMessage = '';
    var self = this;
    const user = this.loginUser;
    this.adminService.signin(this.loginUser)
      .subscribe(
        (data) => {
          console.log('data: ',data)
          if(data['token']){
            localStorage.setItem('token',data['token']);
          }
          //signinForm.reset();
          this.fetchLoggedUser();
          console.log('token is : ',localStorage.getItem('token'));
        }, // success path
        error => {
          self.error = true;
          self.errorMessage = error.error.error.message
        }
      );
    //signinForm.reset();
  }

}
