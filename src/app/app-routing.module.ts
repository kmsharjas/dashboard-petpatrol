import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BannersComponent } from './components/banners/banners.component';
import { BlogsComponent } from './components/blogs/blogs.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { ComboProductsComponent } from './components/combo-products/combo-products.component';
import { EventComponent } from './components/event/event.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { OffersComponent } from './components/offers/offers.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ProductsComponent } from './components/products/products.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { UsersComponent } from './components/users/users.component';
import { OrderDetailsComponent } from './componets/order-details/order-details.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    // canActivate: [AuthGuard],
    component: HomeComponent,
    children: [
      { path: '', redirectTo: 'orders', pathMatch: 'full' },
      { path: 'products', component: ProductsComponent },
      { path: 'offers', component: OffersComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'orders/:id', component: OrderDetailsComponent },
      { path: 'users', component: UsersComponent },
      { path: 'testimonials', component: TestimonialsComponent },
      { path: 'comboProducts', component: ComboProductsComponent },
      { path: 'categories', component: CategoriesComponent },
      { path: 'banners', component: BannersComponent },
      { path: 'blogs', component: BlogsComponent },
      { path: 'event', component: EventComponent },
      // { path: 'units', component: UnitsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
