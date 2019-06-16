import { Component, OnInit, EventEmitter } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Title } from '@angular/platform-browser';
import { ProductHelperService } from 'src/app/services/product-helper.service';
import { StorefrontService } from 'src/app/services/storefront-service.service';
// import {  } from 'protractor';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.less']
})
export class CartComponent implements OnInit {
  products: any = [];
  constructor(
    private title: Title,
    private productHelper: ProductHelperService,
    private storeService: StorefrontService,
    private cart : CartService
  ) { }


  ngOnInit() {
    this.products = this.cart.products;
    console.log(this.products);
  }

  removeProduct(product) {
    this.cart.removeProductFromCart(product._id);
    this.products = this.cart.products;
  }

  addQty(product) {
    this.cart.addQuantity(product._id);
    this.products = this.cart.products;
  }

  removeQty(product) {
    this.cart.removeQuantity(product._id);
    this.products = this.cart.products;
  }

}
