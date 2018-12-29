import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CartComponent } from './cart/cart.component';
import { StoreBaseComponent } from './store-base/store-base.component';

import { CarouselSetComponent } from '../carousel-set/carousel-set.component';
import {StoreRouting} from './storefront.routing';

// import {AdminModule} from '../admin/admin.module';

import { AdminService } from '../services/admin-service.service';
import { StorefrontService } from '../services/storefront-service.service';
import { SubCategoryComponent } from './sub-category/sub-category.component';
import { ProductListComponent } from './product-list/product-list.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { CategoryComponent } from './category/category.component';

@NgModule({
  imports: [
    CommonModule,
    StoreRouting
  ],
  declarations: [ HeaderComponent, CarouselSetComponent, FooterComponent, HomeComponent,
                  NotFoundComponent, CartComponent, StoreBaseComponent, SubCategoryComponent,
                  ProductListComponent, SigninComponent, SignupComponent, CategoryComponent],
  providers:[AdminService, StorefrontService]
})
export class StorefrontModule { }
