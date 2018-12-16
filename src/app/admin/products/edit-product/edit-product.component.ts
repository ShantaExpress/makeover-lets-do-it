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

  addNewSpecification(newSpecification){
    console.log(' newSpecification : ', newSpecification);
    if(newSpecification.trim().length){
      this.product.specification.push({name:newSpecification.trim(),list:[],specProp:'',specPropValue:''});
      this.newSpecification = '';
    }
  }
  deleteSpecification(index){
    this.product.specification.splice(index,1);
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
  
  addNewSpecificationProperty(spec){
    console.log('in addNewSpecificationProperty: ', spec);
    if(spec.specProp && spec.specProp.trim().length && spec.specPropValue && spec.specPropValue.trim().length){
      if(spec.list.length==0){
        spec.list.push({prop:spec.specProp.trim(),propValue:spec.specPropValue.trim()});
        spec.specProp = spec.specPropValue = '';
      } else {
        var props = spec.list.map(prop=>{
          return prop.prop;
        });
        if(props.indexOf(spec.specProp)==-1){
          spec.list.push({prop:spec.specProp.trim(),propValue:spec.specPropValue.trim()});
          spec.specProp = spec.specPropValue = '';
        }
      }
    }
    console.log('latest addNewSpecificationProperty: ', spec);
  }

  deleteSpecificationProperty(list,index){
    list.splice(index,1);
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
}
