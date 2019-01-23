import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { Title } from '@angular/platform-browser';
import { StorefrontService } from '../../services/storefront-service.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.less']
})
export class ProductListComponent implements OnInit {

  subCategory: any;
  productList: any = [];
  sectionalCategory: any;

  constructor(
    private title: Title,
    private storeService: StorefrontService,
    private router:Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.url.subscribe(url =>{
      console.log('this.route.snapshot.params : ' , this.route.snapshot.params);
      this.sectionalCategory = undefined;
      var subCategory = this.route.snapshot.params['subCategory'];
      this.fetchSubCategory(subCategory);
    });
  }

  fetchSubCategory(subCategory: string) {
    this.storeService.getAllPublicData('SubCategory', {identifier: subCategory}).subscribe(
      data => {
        this.subCategory = (data['data'].length) ? data['data'][0] : {};
        console.log('subCategory : ', this.subCategory);
        if (this.subCategory && this.subCategory.name) {
          this.getProductList();
        }
      },
      error => {
        console.log('error: ', error);
      }
    );
  }

  getSectionalCategory (productType) {
    this.storeService.getAllPublicData('SectionalCategory', {identifier: productType}).subscribe(
      data => {
        this.sectionalCategory = data['data'];
        this.getProductList();
      },
      error => {
        console.log('error: ', error);
      }
    );
  }

  getProductList() {
    var productType = this.route.snapshot.params['productType'];
    let filter = {subCategory_id: this.subCategory._id};
    if(productType){
      if(!this.sectionalCategory) {
        this.getSectionalCategory(productType);
        return;
      }
      console.log('this.sectionalCategory : ', this.sectionalCategory[0]._id);
      filter['sectionalCategory_id'] = this.sectionalCategory[0]._id;
    }
    this.storeService.getAllPublicData('Product', filter).subscribe(
      data => {
        this.productList = data['data'];
      },
      error => {
        console.log('error: ', error);
      }
    );

  }
}
