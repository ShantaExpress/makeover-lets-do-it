import { Component, OnInit, Directive,ElementRef,Renderer,ViewChild } from '@angular/core';
import { NgModel,NgForm } from '@angular/forms';
import { Router } from "@angular/router";
import { AdminService } from '../../services/admin-service.service';
import {GridDataType} from '../../models/grid.model';
import { Title } from '@angular/platform-browser';
import { GridTableComponent } from '../../grid-table/grid-table.component';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.less']
})
export class BrandsComponent implements OnInit {
  
  newBrand:any={
    name:'', identifier:'', isEnabled:'',url:'',subCategories:[]
  };
  subCategories:any=[];
  CRUDSuccess:String = '';
  error:String='';

  configuration:GridDataType[]=[
    {field:'name',display:'Name', visible:true,editable:true},
    {field:'identifier',display:'Identifier', visible:true,editable:true},
    {field:'isEnabled',display:'Is Enabled', visible:true,editable:true},
    {field:'url',display:'URL', visible:true,editable:true},
    {field:'subCategories',display:'Sub Categories', type:'Array',
     visible:true,editable:true,parentApi:'subCategory',parentField:'name'}
  ];
  @ViewChild(GridTableComponent, {static:false})
  private grid: GridTableComponent;

  constructor(private adminService: AdminService,private router:Router,private title:Title) {
    this.title.setTitle('Admin: Product Brands');
    this.getBrands();
  }
  getBrands(){
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
  ngOnInit() {
  }

  addBrand(brandAddForm:NgForm){
    var self = this;
    self.setSubCategories();
    self.CRUDSuccess=self.error='';
    console.log('this.newBrand:', this.newBrand);
    // return;
    this.adminService.addItem('brand',this.newBrand).subscribe(
        (data) => {
          console.log('data: ',data) ;
          brandAddForm.reset();
          this.CRUDSuccess = 'Brand Added Successfully';          
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
  getSubCategoriesShort(){
    var subCats = this.getSubCategories();
    if(subCats.length>20){
      subCats = subCats.substr(0,20)+'..';
    }
    return subCats;
  }

  getSubCategories(){
    return this.subCategories.filter(item=>{return item.checked}).map(item=>{return item.name}).join(',');
  }

  setSubCategories(){
    this.newBrand.subCategories = this.subCategories.filter(item=>{return item.checked}).map(item=>{return item._id});
    console.log('in setsetSubCategories');
  }

}