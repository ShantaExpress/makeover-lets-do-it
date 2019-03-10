import { Component, OnInit, Directive,ElementRef,Renderer,ViewChild } from '@angular/core';
import { NgModel,NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { AdminService } from '../../../services/admin-service.service';
import { Title } from '@angular/platform-browser';
import { GridTableComponent } from '../../../grid-table/grid-table.component';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.less']
})
export class EditProductComponent implements OnInit {
  product:any={
    name: "",
    identifier: "",
    isEnabled: "",
    url: "",
    basePrice: undefined,
    discount: undefined,
    quantity: undefined,
    description:"",
    specification:[],
    manufacturer:"",
    seller:"",
    image_id: "",
    category_id:"",
    subCategory_id:"",
    sectionalCategory_id:"",
    brand_id:"",
    tags:[]
  }; 
  newSpecification:any=''; 
  categories:any=[];
  subCategories:any=[];
  sectionalCategories:any=[];
  productFeatures:any=[];
  brands:any=[];
  tags:any=[];
  CRUDSuccess:String = '';
  error:String='';
  constructor(private adminService: AdminService,private router:Router,private route: ActivatedRoute, private title:Title) {
    this.title.setTitle('Admin: Edit Product');

  }

  ngOnInit() {
    this.route.params.subscribe(params=> {
      if(params['id']){
        console.log(params['id']);
        this.getProduct(params['id']);
      } else {        
        this.router.navigateByUrl('/admin/products');
      }
    });    
    this.getBrands();
    this.getSubCategories();
    this.getCategories();
    this.getSectionalCategories();
    this.getTags();
    this.getProductFeatures();
  }

  getProductFeatures(){
    this.adminService.getAllPrivateData('productFeatures').subscribe(
      data=>{
        this.productFeatures = data['data'];
        console.log('this.productFeatures : ', this.productFeatures);
      },
      error=>{
        console.log('error: ' , error);
      }
    )
  }

  getProduct(productId){
    console.log('productId: ' , productId);
    this.adminService.getItem('product',productId).subscribe(
      data=>{
        console.log('data: ', data['data']);
        this.product = data['data'];
      },
      error=>{
        console.log('error: ', error);
      }
    );
  }
  
  getCategories(){    
    this.adminService.getAllPrivateData('category').subscribe(
      data=>{
        this.categories = data['data'];
      },
      error=>{
        console.log('error: ' , error);
      }
    )
  }
  getSubCategories(){    
    this.adminService.getAllPrivateData('subCategory').subscribe(
      data=>{
        this.subCategories = data['data'];
      },
      error=>{
        console.log('error: ' , error);
      }
    )
  }
  getSectionalCategories(){    
    this.adminService.getAllPrivateData('sectionalCategory').subscribe(
      data=>{
        this.sectionalCategories = data['data'];
      },
      error=>{
        console.log('error: ' , error);
      }
    )
  }

  getBrands(){    
    this.adminService.getAllPrivateData('brand').subscribe(
      data=>{
        this.brands = data['data'];
      },
      error=>{
        console.log('error: ' , error);
      }
    )
  }
  
  getTags(){    
    this.adminService.getAllPrivateData('tags').subscribe(
      data=>{
        this.tags = data['data'];
        if (this.product && this.product.tags && this.product.tags.length) {
          this.tags = this.tags.map(item => {
            item.checked = this.product.tags.indexOf(item._id) >= 0 ? true : false;
            return item;
          });
        }
      },
      error=>{
        console.log('error: ' , error);
      }
    )
  }
  
  setFeatures(specifications:any){
    this.product.specification = specifications;
    console.log('this.product : ', this.product);
  }
  
  setTags(){
    this.product.tags = this.tags.filter(item=>{return item.checked}).map(item=>{return item._id});
  }

  submitUpdateProduct(editProductForm:NgForm){
    this.setTags();
    console.log('in submit: ' , this.product);    
    var self = this;
    
    window['showGlobalLoading']();
    this.adminService.updateItem('product',this.product).subscribe(
      data=>{
        window.scroll(0,0);
        this.CRUDSuccess = "Product updated successfully!!";
        window['hideGlobalLoading']();
        setTimeout(function(){
          self.CRUDSuccess='';
        },6000);
      },
      error=>{
        window.scroll(0,0);
        this.error = "Updating failed due to Technical Error";
        window['hideGlobalLoading']();
        setTimeout(function(){
          self.error='';
        },6000);
      }
    );
  }
  
  selectSpecification() {
    console.log('in selectSpecification : ', this.product.sectionalCategory_id);
    let specification = this.productFeatures.find(item=>{
      return item.sectionalCategory_id == this.product.sectionalCategory_id;
    });
    if(specification){
      this.product.specification = JSON.parse(JSON.stringify(specification.specifications));
    }
    console.log('specification : ', specification);
  }

}
