import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { Title } from '@angular/platform-browser';
import { StorefrontService } from '../../services/storefront-service.service';
import { ProductHelperService } from '../../services/product-helper.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.less']
})
export class ProductDetailsComponent implements OnInit {

  product:any = {};

  constructor(
    private title: Title,
    private storeService: StorefrontService,
    private productHelper: ProductHelperService,
    private router:Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.url.subscribe(url =>{
      var productIdentifier = this.route.snapshot.params['productIdentifier'];
      if(this.storeService.ready) {
        this.fetchProduct(productIdentifier);
      }
      this.storeService.getNotifiedWhenReady.subscribe(value => {
        if (value === true) {
            this.fetchProduct(productIdentifier);
          }
        });
    });
  }

  toggleFav(product){
    product.fav = !product.fav;
  }
  
  fetchProduct(identifier) {
    
    this.storeService.getAllPublicData('Product', {'identifier':identifier}).subscribe(
      data => {
        if(data['data'].length) {
          this.product = data['data'][0];
          console.log('found product: ', this.product);
        }
      },
      error => {
        console.log('error: ', error);
      }
    );
  }

}
