import { Component, OnInit, Directive,ElementRef,Renderer } from '@angular/core';
import { NgModel,NgForm } from '@angular/forms';
import { Router } from "@angular/router";
import { AdminService } from '../../../services/admin-service.service';
//import { setTimeout } from 'timers';

import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-add-banner',
  templateUrl: './add-banner.component.html',
  styleUrls: ['./add-banner.component.less']
})
export class AddBannerComponent implements OnInit {
  
  banner: any = {
    name: '',
    imageId: '',
    taggedTo: '',
    description: '',
    isEnabled: '',
    rank: undefined,
    title: '',
    paragraph: '',
    link: '',
    validUpto: undefined
  }

  CRUDSuccess:String = '';
  error:String='';

  constructor(private adminService:AdminService,private title:Title) {
  }

  ngOnInit() {
    this.title.setTitle('Admin:Add Banner');
  }

  submitAddBanner(bannerAddForm:NgForm){
    this.error='';
    this.CRUDSuccess='';
    var self = this;
    this.adminService.addItem('banner',this.banner)
      .subscribe(
        (data) => {
          bannerAddForm.reset();
          self.banner.isEnabled = '';
          this.CRUDSuccess = 'Banner Added Successfully';
          setTimeout(function(){
            self.CRUDSuccess = '';
          },5000);
        }, // success path
        (error) => {
          console.log('in error:',error);
          console.log('in error:',Object.keys(error));
          self.error = error.error.error.message;
          setTimeout(function(){
            self.error = '';
          },5000);
        }
      );
    
  }
}
