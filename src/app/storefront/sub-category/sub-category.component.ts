import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { Title } from '@angular/platform-browser';
import { StorefrontService } from '../../services/storefront-service.service';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.less']
})
export class SubCategoryComponent implements OnInit {

  subCategory: any;
  productList: any = [];

  constructor(
    private title: Title,
    private storeService: StorefrontService,
    private router:Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    console.log(this.route.snapshot.params);

    this.route.url.subscribe(url =>{      
      var subCategory = this.route.snapshot.params['subCategory'];
      this.fetchSubCategory(subCategory);
    });
  }

  fetchSubCategory(subCategory: string) {
    this.storeService.getAllPublicData('SubCategory', {identifier: subCategory}).subscribe(
      data => {
        this.subCategory = (data['data'].length) ? data['data'][0] : {};
        this.getProductList();
      },
      error => {
        console.log('error: ', error);
      }
    );
  }

  getProductList() {
    this.storeService.getAllPublicData('Product', {subCategory_id: this.subCategory._id}).subscribe(
      data => {
        this.productList = data['data'];
      },
      error => {
        console.log('error: ', error);
      }
    );

  }
}
