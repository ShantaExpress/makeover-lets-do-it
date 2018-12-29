
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CartComponent } from './cart/cart.component';
import { StoreBaseComponent } from './store-base/store-base.component';
import { HomeComponent } from './home/home.component';
import { SubCategoryComponent } from './sub-category/sub-category.component';
import { ProductListComponent } from './product-list/product-list.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { AdminService } from '../services/admin-service.service';
import { AdminGuard } from '../guards/admin.guard';
import { CategoryComponent } from './category/category.component';

// { path: 'admin', component: HomeComponent },
// { path: 'admin/login', component: AdminLoginComponent },
// { path: 'admin/brands', component: BrandsComponent }

const storeRoutes: Routes = [
    {
        path: 'store',
        component: StoreBaseComponent,
        children: [
            { path: '', component: HomeComponent },
            { path: 'signin', component: SigninComponent},
            { path: 'signup', component: SignupComponent},
            { path: 'cart', component: CartComponent},
            { path: 'shop/:category', component: CategoryComponent},
            { path: 'shop/:category/:subCategory', component: SubCategoryComponent},
            { path: 'shop/:category/:subCategory/:products', component: ProductListComponent},
        ]
    }
        
    // { path: 'admin', component: HomeComponent },
    // { path: 'admin/login', component: AdminLoginComponent },
    // { path: 'admin/brands', component: BrandsComponent }
];

@NgModule({
    imports:[RouterModule.forChild(storeRoutes)],
    exports: [RouterModule]
})
export class StoreRouting{

}