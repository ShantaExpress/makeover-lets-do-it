import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { Title } from '@angular/platform-browser';
import { StorefrontService } from '../../services/storefront-service.service';
import { ProductHelperService } from '../../services/product-helper.service';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.less']
})
export class ProductListComponent implements OnInit {

  subCategory: any;
  productList: any = [];

  constructor(
    private title: Title,
    private storeService: StorefrontService,
    private productHelper: ProductHelperService,
    private router:Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    let price = this.productHelper.getPriceFormat(1299);
    console.log('price : ', price);
    this.route.url.subscribe(url =>{
      var subCategory = this.route.snapshot.params['subCategory'];
      if(this.storeService.ready) {
        this.fetchSubCategory(subCategory);
      }
      this.storeService.getNotifiedWhenReady.subscribe(value => {
        if (value === true) {
            this.fetchSubCategory(subCategory);
          }
        });
    });
  }

  toggleFav(product){
    product.fav = !product.fav;
    
  }

  fetchSubCategory(subCategory: string) {
    this.subCategory = this.storeService.getProductInfo('SubCategory','identifier',subCategory, false);
    if (this.subCategory && this.subCategory.name) {
      this.getProductList();
    }
  }

  getProductList() {
    var productType = this.route.snapshot.params['productType'];
    let filter = {subCategory_id: this.subCategory._id};
    if(productType){
      filter['sectionalCategory_id'] = this.storeService.getProductInfo('SectionalCategory','identifier',productType, '_id');
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
