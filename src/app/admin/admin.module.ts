import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import {AdminRouting} from './admin.routing';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { CockpitComponent } from './cockpit/cockpit.component';
import { BackofficeComponent } from './backoffice/backoffice.component';
import { UsersComponent } from './users/users.component';
import { CategoriesComponent } from './categories/categories.component';
import { SubCategoriesComponent } from './sub-categories/sub-categories.component';
import { AddressComponent } from './address/address.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { MediaComponent } from './media/media.component';
import { BrandsComponent } from './brands/brands.component';
import { AdminService } from '../services/admin-service.service';
import { AdminGuard } from '../guards/admin.guard';
import { EmailValidator } from '../directives/custom.directive';
import { AdminBaseComponent } from './admin-base/admin-base.component';
import { ProductsComponent } from './products/products.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { AddProductComponent } from './products/add-product/add-product.component';
import { EditProductComponent } from './products/edit-product/edit-product.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { FileSelectDirective } from 'ng2-file-upload';

import { GridTableComponent } from '../grid-table/grid-table.component';
import { SectionalCategoryComponent } from './sectional-category/sectional-category.component';
import { SubCategoryFilterPipe,SectionalCategoryFilterPipe,BrandFilterPipe } from './admin.pipe';
import { BannersComponent } from './banners/banners.component';
import { AddBannerComponent } from './banners/add-banner/add-banner.component';
import { BannerListComponent } from './banners/banner-list/banner-list.component';
import { TagsComponent } from './tags/tags.component';
import { PageSettingsComponent } from './page-settings/page-settings.component';
import { ProductSpecificationComponent } from './product-specification/product-specification.component';
import { ProductSpecificationListComponent } from './product-specification/product-specification-list/product-specification-list.component';
import { AddProductSpecificationComponent } from './product-specification/add-product-specification/add-product-specification.component';
import { UpdateProductSpecificationComponent } from './product-specification/update-product-specification/update-product-specification.component';
import { ProductFeaturesComponent } from './utility/product-features/product-features.component';
import { ProductFilterComponent } from './product-filter/product-filter.component';
import { AddProductFilterComponent } from './product-filter/add-product-filter/add-product-filter.component';
import { UpdateProductFilterComponent } from './product-filter/update-product-filter/update-product-filter.component';
import { ProductFilterListComponent } from './product-filter/product-filter-list/product-filter-list.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    AdminRouting
  ],
  declarations: [
    AdminLoginComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    CockpitComponent,
    BackofficeComponent,
    UsersComponent,
    CategoriesComponent,
    SubCategoriesComponent,
    AddressComponent,
    MediaComponent,
    BrandsComponent,
    EmailValidator,
    AdminBaseComponent,
    ProductsComponent,
    AddUserComponent,
    UserListComponent,
    GridTableComponent,
    ProductListComponent,
    AddProductComponent,
    EditProductComponent,
    SectionalCategoryComponent,
    SubCategoryFilterPipe,
    SectionalCategoryFilterPipe,
    BrandFilterPipe,
    FileSelectDirective,
    BannersComponent,
    AddBannerComponent,
    BannerListComponent,
    TagsComponent,
    PageSettingsComponent,
    ProductSpecificationComponent,
    ProductSpecificationListComponent,
    AddProductSpecificationComponent,
    UpdateProductSpecificationComponent,
    ProductFeaturesComponent,
    ProductFilterComponent,
    AddProductFilterComponent,
    UpdateProductFilterComponent,
    ProductFilterListComponent
  ],
  providers:[AdminService,AdminGuard]
})
export class AdminModule { }
