import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

// import {AdminModule} from './admin/admin.module';
import {StorefrontModule} from './storefront/storefront.module';

import { AppComponent } from './app.component';
import { TestComponent } from './test/test.component';
import { NotFoundComponent } from './not-found/not-found.component';

// { path: '', redirectTo: 'store', pathMatch: 'full'},
const appRoutes: Routes = [
  { path: '', redirectTo: 'store', pathMatch: 'full'},
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(mod => mod.AdminModule)},
  { path: 'store', loadChildren: () => import('./storefront/storefront.module').then(mod => mod.StorefrontModule)},
  { path: 'test', component: TestComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
