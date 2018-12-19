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

@NgModule({
  imports: [
    CommonModule,
    StoreRouting
  ],
  declarations: [HeaderComponent, CarouselSetComponent, FooterComponent, HomeComponent, NotFoundComponent, CartComponent, StoreBaseComponent],
  providers:[AdminService, StorefrontService]
})
export class StorefrontModule { }
