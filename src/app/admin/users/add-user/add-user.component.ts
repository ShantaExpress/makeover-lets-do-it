import { Component, OnInit, Directive,ElementRef,Renderer } from '@angular/core';
import { NgModel,NgForm } from '@angular/forms';
import { Router } from "@angular/router";
import { AdminServiceService } from '../../../services/admin-service.service';
import { LoginUser, User } from "../../../models/user.model";
//import { setTimeout } from 'timers';

import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.less']
})
export class AddUserComponent implements OnInit {
  user:User=new User('','','','','');
  userTypeOptions:String[]=["Admin","Vendor","Customer"];
  
  passwordType: String = 'password';
  CRUDSuccess:String = '';
  error:String='';
  timer=7000;

  constructor(private adminService:AdminServiceService,private title:Title) {

  }

  ngOnInit() {
    this.title.setTitle('Admin:Add User');
  }
  
  changePasswordType(){
    this.passwordType = this.passwordType=='password'?'text':'password';
  }
  submitAddUser(form:NgForm){
    console.log('user: ', this.user);
    var self = this;
    this.adminService.addItem('user',this.user).subscribe(
      data=>{
        console.log('data:', data);
        this.CRUDSuccess = 'User Added Successfully';
        form.reset();
        setTimeout(function(){
          self.CRUDSuccess = "";
        },self.timer);
      },
      error=>{
        console.log('error: ' , error);
        setTimeout(function(){
          self.error = "";
        },self.timer);
        this.error = error['error'].error.message||'Sorry!! Adding User is unsuccess!!';
      }
    )
  }
}
