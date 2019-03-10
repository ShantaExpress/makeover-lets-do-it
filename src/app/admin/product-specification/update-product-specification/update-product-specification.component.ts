import { Component, OnInit, Directive,ElementRef,Renderer,ViewChild } from '@angular/core';
import { NgModel,NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { AdminService } from '../../../services/admin-service.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-update-product-specification',
  templateUrl: './update-product-specification.component.html',
  styleUrls: ['./update-product-specification.component.less']
})
export class UpdateProductSpecificationComponent implements OnInit {
  productFeature:any={
    name: "",
    identifier: "",
    sectionalCategory_id:"",
    specifications: []
  };
  CRUDSuccess:String = '';
  error:String='';
  newSpecification:any=''; 
  sectionalCategories:any = [];

  constructor(private adminService: AdminService,private router:Router,private route: ActivatedRoute,private title:Title) {
    this.title.setTitle('Admin: Update Product Feature');
  }

  ngOnInit() {
    this.route.params.subscribe(params=> {
      if(params['id']){
        console.log(params['id']);
        this.getProductFeature(params['id']);
      } else {        
        this.router.navigateByUrl('/admin/products');
      }
    });  
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
   
  getProductFeature(id:any) {
    console.log('id: ' , id);
    this.adminService.getItem('productFeatures',id).subscribe(
      data=>{
        console.log('data: ', data['data']);
        this.productFeature = data['data'];
      },
      error=>{
        console.log('error: ', error);
      }
    );
  }

  
  setFeatures(specifications:any){
    this.productFeature.specifications = specifications;
    console.log('this.productFeature : ', this.productFeature);
  }

  
  updateProductFeature(updateProductFeatureForm:NgForm){
    var self = this;
    console.log('in updateProductFeature Form where product :', this.productFeature);
    // return;
    window['showGlobalLoading']();
    this.adminService.updateItem('productFeatures',this.productFeature).subscribe(
        (data) => {
          console.log('data: ',data) ;
          window.scroll(0,0);
          window['hideGlobalLoading']();
          updateProductFeatureForm.reset();
          this.CRUDSuccess = 'Product Feature Updated Successfully';          
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
  resetProductFeature(updateProductFeatureForm:NgForm){
    console.log('in resetProduct Form where product :', this.productFeature);
    updateProductFeatureForm.reset();
    
  }

}
