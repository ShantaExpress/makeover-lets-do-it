import { Component, OnInit, Directive,ElementRef,Renderer,ViewChild } from '@angular/core';
import { NgModel,NgForm } from '@angular/forms';
import { Router } from "@angular/router";
import { AdminService } from '../../../services/admin-service.service';
import { Title } from '@angular/platform-browser';
import { GridTableComponent } from '../../../grid-table/grid-table.component';

@Component({
  selector: 'app-add-product-specification',
  templateUrl: './add-product-specification.component.html',
  styleUrls: ['./add-product-specification.component.less']
})
export class AddProductSpecificationComponent implements OnInit {
  newProductFeature:any={
    name: "",
    identifier: "",
    sectionalCategory_id:"",
    specifications: []
  };
  CRUDSuccess:String = '';
  error:String='';
  newSpecification:any=''; 
  sectionalCategories:any = [];
  constructor(private adminService: AdminService,private router:Router,private title:Title) {
    this.title.setTitle('Admin: Add Product Feature');
  }

  ngOnInit() {
    this.getSectionalCategories();
  }

  getSectionalCategories() {  
    this.adminService.getAllPrivateData('sectionalCategory').subscribe(
      data=>{
        this.sectionalCategories = data['data'];
      },
      error=>{
        console.log('error: ' , error);
      }
    )
  }
  
  addProductFeature(addProductFeatureForm:NgForm){
    var self = this;
    console.log('in addProduct Form where product :', this.newProductFeature);
    // return;
    window['showGlobalLoading']();
    this.adminService.addItem('productFeatures',this.newProductFeature).subscribe(
        (data) => {
          console.log('data: ',data) ;
          window.scroll(0,0);
          window['hideGlobalLoading']();
          addProductFeatureForm.reset();
          this.CRUDSuccess = 'Product Feature Added Successfully';          
          //this.grid.getAllData();
          setTimeout(function(){
            self.CRUDSuccess = '';
          },5000);
        }, // success path
        (error) => {
          window.scroll(0,0);
          window['hideGlobalLoading']();
          console.log('in error:',error);
          console.log('in error:',Object.keys(error));
          self.error = error.error.error.message;
        }
      );
  }
  resetProductFeature(addProductFeatureForm:NgForm){
    console.log('in resetProduct Form where product :', this.newProductFeature);
    addProductFeatureForm.reset();
  }

  setFeatures(specifications:any){
    this.newProductFeature.specifications = specifications;
    console.log('this.newProductFeature : ', this.newProductFeature);
  }

}
