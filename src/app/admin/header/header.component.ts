import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from '../../services/admin-service.service';
import { Router } from "@angular/router";
import { User } from "../../models/user.model";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
  user:User;
  constructor(private adminService: AdminServiceService,private router:Router) { }
  
  ngOnInit() {
    this.adminService.loggedUser.subscribe((user:User)=>{
      this.user = user;
      console.log('user : ' , this.user);
    });
    this.adminService.checkValidLoggedIn();
  }

  logout(){
    this.adminService.signout();
  }

}
