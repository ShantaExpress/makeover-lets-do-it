import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  productAddedToCart: EventEmitter<boolean> = new EventEmitter<boolean>();
  products: any = [];
  constructor() { }
  
  addProductToCart(product) {
    let index = this.products.findIndex(item=>{
      return item._id == product._id;
    });

    console.log(index);
    if(index>=0) {
      this.products[index].count += 1;
    } else {
      product.count = 1;
      this.products.push(product);
      this.productAddedToCart.emit(true);
    }
  }

  removeProductFromCart(id) {
    let index = this.products.findIndex(item=>{
      return item._id == id;
    });

    this.products.splice(index, 1);
    this.productAddedToCart.emit(true);
  }

  addQuantity(id) {
    let index = this.products.findIndex(item=>{
      return item._id == id;
    });
    this.products[index].count++;
  }
  
  removeQuantity(id) {
    let index = this.products.findIndex(item=>{
      return item._id == id;
    });
    if(this.products[index].count) {
      this.products[index].count--;
    }
  }
}
