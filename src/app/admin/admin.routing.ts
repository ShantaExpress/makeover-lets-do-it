
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import {AdminBaseComponent} from './admin-base/admin-base.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { CockpitComponent } from './cockpit/cockpit.component';
import { BackofficeComponent } from './backoffice/backoffice.component';
import { UsersComponent } from './users/users.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { CategoriesComponent } from './categories/categories.component';
import { SubCategoriesComponent } from './sub-categories/sub-categories.component';
import { AddressComponent } from './address/address.component';
import { CategoryComponent } from './category/category.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { MediaComponent } from './media/media.component';
import { BrandsComponent } from './brands/brands.component';
import { ProductsComponent } from './products/products.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { AddProductComponent } from './products/add-product/add-product.component';
import { EditProductComponent } from './products/edit-product/edit-product.component';
import { AdminService } from '../services/admin-service.service';
import { SectionalCategoryComponent } from './sectional-category/sectional-category.component';
import { BannersComponent } from './banners/banners.component';
import { AddBannerComponent } from './banners/add-banner/add-banner.component';
import { BannerListComponent } from './banners/banner-list/banner-list.component';
import { TagsComponent } from './tags/tags.component';
import { AdminGuard } from '../guards/admin.guard';

const adminRoutes: Routes = [
    {
        path: 'admin',
        component: AdminBaseComponent,
        children: [
            { path: '', component: HomeComponent },
            { path: 'home', component: HomeComponent },
            { path: 'users', component: UsersComponent,
              children:[
                // {path:'', redirectTo: 'list', pathMatch: 'full'},
                {path:'',component:UserListComponent},
                {path:'add',component:AddUserComponent}
              ]
            },
            { path: 'address', component: AddressComponent},
            { path: 'categories', component: CategoriesComponent},
            { path: 'sub-categories', component: SubCategoriesComponent},
            { path: 'products', component: ProductsComponent,
                children:[
                // {path:'', redirectTo: 'list', pathMatch: 'full'},
                {path:'',component:ProductListComponent},
                {path:'add',component:AddProductComponent},
                {path:'edit',component:EditProductComponent},
                {path:'edit/:id',component:EditProductComponent}
                ]
            },
            { path: 'login', component: AdminLoginComponent},
            { path: 'brands', component: BrandsComponent},
            { path: 'sectional-categories', component: SectionalCategoryComponent},
            { path: 'media', component: MediaComponent},
            { path: 'banners', component: BannersComponent,
                children: [
                    {path:'', component: BannerListComponent},
                    {path:'add', component: AddBannerComponent}
                ]
            },
            { path: 'tags', component: TagsComponent},
        ]
    }
];

@NgModule({
    imports:[RouterModule.forChild(adminRoutes)],
    exports: [RouterModule]
})
export class AdminRouting{

}