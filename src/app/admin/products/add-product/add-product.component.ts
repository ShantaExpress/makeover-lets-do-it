import { Component, OnInit, Directive,ElementRef,Renderer,ViewChild } from '@angular/core';
import { NgModel,NgForm } from '@angular/forms';
import { Router } from "@angular/router";
import { AdminService } from '../../../services/admin-service.service';
import { Title } from '@angular/platform-browser';
import { GridTableComponent } from '../../../grid-table/grid-table.component';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.less']
})
export class AddProductComponent implements OnInit {
  product:any={
    name: "Men Shirt",
    identifier: "Men Shirt",
    isEnabled: "true",
    url: "Men Shirt",
    basePrice: 100,
    discount: 0,
    quantity: 1,
    description:"Men Shirt",
    specification:[],
    manufacturer:"Men Shirt",
    seller:"Men Shirt",
    image_id: "Men Shirt",
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

  @ViewChild(GridTableComponent)
  private grid: GridTableComponent;
  constructor(private adminService: AdminService,private router:Router,private title:Title) {
    this.title.setTitle('Admin: Add Product');
  }

  ngOnInit() {
    this.getBrands();
    this.getSubCategories();
    this.getCategories();
    this.getSectionalCategories();
    this.getTags();
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

  addProduct(addProductForm:NgForm){
    var self = this;
    this.setTags();
    console.log('in addProduct Form where product :', this.product);
    // return;
    window['showGlobalLoading']();
    this.adminService.addItem('product',this.product).subscribe(
        (data) => {
          console.log('data: ',data) ;
          window.scroll(0,0);
          window['hideGlobalLoading']();
          addProductForm.reset();
          this.CRUDSuccess = 'Product Added Successfully';          
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
  resetProduct(addProductForm:NgForm){
    console.log('in resetProduct Form where product :', this.product);
    addProductForm.reset();
    
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
        console.log('this.tags : ', this.tags);
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
}
