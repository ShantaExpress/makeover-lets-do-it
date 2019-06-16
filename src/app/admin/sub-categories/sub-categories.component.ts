import { Component, OnInit, Directive,ElementRef,Renderer,ViewChild } from '@angular/core';
import { NgModel,NgForm } from '@angular/forms';
import { Router } from "@angular/router";
import { AdminService } from '../../services/admin-service.service';
import {GridDataType} from '../../models/grid.model';
import { Title } from '@angular/platform-browser';
import { GridTableComponent } from '../../grid-table/grid-table.component';

@Component({
  selector: 'app-sub-categories',
  templateUrl: './sub-categories.component.html',
  styleUrls: ['./sub-categories.component.less']
})
export class SubCategoriesComponent implements OnInit {
  newSubCategory:any={
    name:'', identifier:'', isEnabled:'',url:'',category_id:'', imageName:''
  };
  categories:any=[];
  CRUDSuccess:String = '';
  error:String='';
  configuration:GridDataType[]=[
    {field:'name',display:'Name', visible:true,editable:true},
    {field:'identifier',display:'Identifier', visible:true,editable:true},
    {field:'isEnabled',display:'Is Enabled', visible:true,editable:true},
    {field:'url',display:'URL', visible:true,editable:true},
    {field:'category_id',display:'Category',
     visible:true,editable:true,parentApi:'category',parentField:'name'},
    {field:'imageName',display:'Image Name', visible:true,editable:true}
  ];
  
  @ViewChild(GridTableComponent, {static: false})
  private grid: GridTableComponent;

  constructor(private adminService: AdminService,private router:Router,private title:Title) { }

  ngOnInit() {
    this.title.setTitle('Admin: Sub-Category');
    this.getCategories();
  }
  getCategories(){
    
    this.adminService.getAllCategories().subscribe(
      data=>{
        console.log('data: ' , data);
        this.categories = data['data'];
      },
      error=>{
        console.log('error: ' , error);
      }
    )
  }

  addSubCategory(subCategoryAddForm:NgForm){
    var self = this;
    console.log('this.subCategory:', this.newSubCategory);
    // return;
    this.adminService.addItem('subCategory',this.newSubCategory).subscribe(
        (data) => {
          console.log('data: ',data) ;
          subCategoryAddForm.reset();
          this.CRUDSuccess = 'SubCategory Added Successfully';          
          this.grid.getAllData();
          setTimeout(function(){
            self.CRUDSuccess = '';
          },5000);
        }, // success path
        (error) => {
          console.log('in error:',error);
          console.log('in error:',Object.keys(error));
          self.error = error.error.error.message;
        }
      );
  }
}
