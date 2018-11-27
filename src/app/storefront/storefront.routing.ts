
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CartComponent } from './cart/cart.component';
import { StoreBaseComponent } from './store-base/store-base.component';
import { HomeComponent } from './home/home.component';
import { AdminService } from '../services/admin-service.service';
import { AdminGuard } from '../guards/admin.guard';


// { path: 'admin', component: HomeComponent },
// { path: 'admin/login', component: AdminLoginComponent },
// { path: 'admin/brands', component: BrandsComponent }

const storeRoutes: Routes = [
    {
        path: 'store',
        component: StoreBaseComponent,
        children: [
            { path: '', component: HomeComponent },
            { path: 'cart', component: CartComponent}
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