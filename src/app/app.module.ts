import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductsComponent } from './components/products/products.component';
import { HttpClientModule } from '@angular/common/http';
import { OrdersComponent } from './components/orders/orders.component';
import { UsersComponent } from './components/users/users.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComboProductsComponent } from './components/combo-products/combo-products.component';
import { LoginComponent } from './components/login/login.component';
import { OffersComponent } from './components/offers/offers.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { CategoryComponent } from './components/categories/category/category.component';
import { SubCategoryComponent } from './components/categories/sub-category/sub-category.component';
import { BannersComponent } from './components/banners/banners.component';
import { BlogsComponent } from './components/blogs/blogs.component';
import { OrderDetailsComponent } from './componets/order-details/order-details.component';
import { EventComponent } from './components/event/event.component';
import { ServiceCategoryComponent } from './components/categories/service-category/service-category.component';
import { PackingComponent } from './components/packing/packing.component';
import { CustomersComponent } from './components/customers/customers.component';
import { EditorComponent } from './components/editor/editor.component';
import { QuillModule } from 'ngx-quill';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    ProductsComponent,
    OrdersComponent,
    UsersComponent,
    TestimonialsComponent,
    ComboProductsComponent,
    LoginComponent,
    OffersComponent,
    CategoriesComponent,
    CategoryComponent,
    SubCategoryComponent,
    BannersComponent,
    BlogsComponent,
    OrderDetailsComponent,
    EventComponent,
    ServiceCategoryComponent,
    PackingComponent,
    CustomersComponent,
    EditorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
