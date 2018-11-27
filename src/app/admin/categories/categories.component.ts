import { Component, OnInit, Directive,ElementRef,Renderer,ViewChild } from '@angular/core';
import { NgModel,NgForm } from '@angular/forms';
import { Router } from "@angular/router";
import { AdminService } from '../../services/admin-service.service';
import { GridTableComponent } from '../../grid-table/grid-table.component';
//import { setTimeout } from 'timers';

import {GridDataType} from '../../models/grid.model';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.less']
})
export class CategoriesComponent implements OnInit {
  newCategory:any={
    name:'',identifier:'',isEnabled:'',url:''
  }
  CRUDSuccess:String = '';
  error:String='';
  configuration:GridDataType[]=[
    {field:'name',display:'Category Name', visible:true,editable:true},
    {field:'identifier',display:'Identifier', visible:true,editable:true},
    {field:'isEnabled',display:'IsEnabled', visible:true,editable:true},
    {field:'url',display:'URL', visible:true,editable:true}
  ];
  
  @ViewChild(GridTableComponent)
  private grid: GridTableComponent;

  constructor(private adminService: AdminService,private router:Router,private title:Title) { }

  ngOnInit() {
    this.title.setTitle('Admin: Category');
  }


  addCategory(categoryAddForm:NgForm){
    this.error='';
    this.CRUDSuccess='';
    console.log('newCategory: ' , this.newCategory);
    var self = this;
    this.adminService.addItem('category',this.newCategory)
      .subscribe(
        (data) => {
          console.log('data: ',data) ;
          categoryAddForm.reset();
          self.newCategory.isEnabled = '';
          this.CRUDSuccess = 'Category Added Successfully';
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
