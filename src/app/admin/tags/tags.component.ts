import { Component, OnInit, Directive,ElementRef,Renderer,ViewChild } from '@angular/core';
import { NgModel,NgForm } from '@angular/forms';
import { Router } from "@angular/router";
import { AdminService } from '../../services/admin-service.service';
import { GridTableComponent } from '../../grid-table/grid-table.component';
//import { setTimeout } from 'timers';

import {GridDataType} from '../../models/grid.model';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.less']
})
export class TagsComponent implements OnInit {
  newTag:any={
    name:'',identifier:'',isEnabled:''
  }
  CRUDSuccess:String = '';
  error:String='';
  configuration:GridDataType[]=[
    {field:'name',display:'Tag Name', visible:true,editable:true},
    {field:'identifier',display:'Identifier', visible:true,editable:true},
    {field:'isEnabled',display:'IsEnabled', visible:true,editable:true}
  ];
  
  @ViewChild(GridTableComponent, {static:false})
  private grid: GridTableComponent;

  constructor(private adminService: AdminService,private router:Router,private title:Title) { }

  ngOnInit() {
    this.title.setTitle('Admin: Tags');
  }


  addTag(tagAddForm:NgForm){
    this.error='';
    this.CRUDSuccess='';
    console.log('newTag: ' , this.newTag);
    var self = this;
    this.adminService.addItem('tags',this.newTag)
      .subscribe(
        (data) => {
          console.log('data: ',data) ;
          tagAddForm.reset();
          self.newTag.isEnabled = '';
          this.CRUDSuccess = 'Tag Added Successfully';
          this.grid.getAllData();
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
