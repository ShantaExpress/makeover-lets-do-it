import { Component, OnInit, Directive,ElementRef,Renderer } from '@angular/core';
import { NgModel,NgForm } from '@angular/forms';
import { Router } from "@angular/router";
import { AdminServiceService } from '../../../services/admin-service.service';
import { LoginUser, User } from "../../../models/user.model";

import {GridDataType} from '../../../models/grid.model';
import { Title } from '@angular/platform-browser';

// import { setTimeout } from 'timers';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.less']
})
export class UserListComponent implements OnInit {
  users:User[]=[];
  constructor(private adminService:AdminServiceService,private title:Title) { }
  CRUDSuccess:any;
  error:any;
  timer=6000;

  configuration:GridDataType[]=[
    {field:'firstName',display:'First Name', visible:true,editable:true},
    {field:'lastName',display:'Last Name', visible:true,editable:true},
    {field:'email',display:'Email', visible:true,editable:false},
    {field:'userType',display:'User Type', visible:true,editable:true},
    {field:'password',display:'Password', visible:true,editable:true,type:'password'}
  ];

  ngOnInit() {
    this.title.setTitle('Admin: User');
    //this.getAllUsers();
  }

}
