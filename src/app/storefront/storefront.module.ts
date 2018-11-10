import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CartComponent } from './cart/cart.component';
import { StoreBaseComponent } from './store-base/store-base.component';

import {StoreRouting} from './storefront.routing';

@NgModule({
  imports: [
    CommonModule,
    StoreRouting
  ],
  declarations: [HeaderComponent, FooterComponent, HomeComponent, NotFoundComponent, CartComponent, StoreBaseComponent]
})
export class StorefrontModule { }
