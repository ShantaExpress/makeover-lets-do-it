import { Component, OnInit, Directive,ElementRef,Renderer,ViewChild } from '@angular/core';
import { NgModel,NgForm } from '@angular/forms';
import { Router } from "@angular/router";
import { AdminService } from '../../services/admin-service.service';
import {GridDataType} from '../../models/grid.model';
import { Title } from '@angular/platform-browser';
import { GridTableComponent } from '../../grid-table/grid-table.component';

@Component({
  selector: 'app-sectional-category',
  templateUrl: './sectional-category.component.html',
  styleUrls: ['./sectional-category.component.less']
})
export class SectionalCategoryComponent implements OnInit {
  newSectionalCategory:any={
    name:'', identifier:'', isEnabled:'',url:'',subCategory_id:'', imageName:''
  };
  subCategories:any=[];
  CRUDSuccess:String = '';
  error:String='';
  configuration:GridDataType[]=[
    {field:'name',display:'Name', visible:true,editable:true},
    {field:'identifier',display:'Identifier', visible:true,editable:true},
    {field:'isEnabled',display:'Is Enabled', visible:true,editable:true},
    {field:'url',display:'URL', visible:true,editable:true},
    {field:'subCategory_id',display:'Sub-Category',
     visible:true,editable:true,parentApi:'subCategory',parentField:'name'},
    {field:'imageName',display:'Image Name', visible:true,editable:true}
  ];
  
  @ViewChild(GridTableComponent)
  private grid: GridTableComponent;
  constructor(private adminService: AdminService,private router:Router,private title:Title) { }

  ngOnInit() {
    this.title.setTitle('Admin: Sectional-Category');
    this.getSubCategories();
  }

  getSubCategories(){    
    this.adminService.getAllPrivateData('subCategory').subscribe(
      data=>{
        console.log('data: ' , data);
        this.subCategories = data['data'];
      },
      error=>{
        console.log('error: ' , error);
      }
    )
  }

  addSectionalCategory(sectionalCategoryAddForm:NgForm){
    var self = this;
    console.log('this.sectionalCategory:', this.newSectionalCategory);
    // return;
    this.adminService.addItem('sectionalCategory',this.newSectionalCategory).subscribe(
        (data) => {
          console.log('data: ',data) ;
          sectionalCategoryAddForm.reset();
          this.CRUDSuccess = 'SectionalCategory Added Successfully';          
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
