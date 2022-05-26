import { Component, OnDestroy, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SubSink } from 'subsink';
import { AdminRole, AdminUser } from 'src/app/model/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private subs = new SubSink();
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  navList = [];

  user: AdminUser;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.subs.sink = this.auth.getAuthState().subscribe((user) => {
      this.user = user as AdminUser;
      const { desig_id } = user;
      this.navList = [
        { name: 'Products', icon: 'inventory_2', path: 'products' },
        { name: 'Offers', icon: 'local_offer', path: 'offers' },
        { name: 'Packing Type', icon: 'local_offer', path: 'packing' },
        { name: 'Orders', icon: 'shopping_cart', path: 'orders' },
        { name: 'Customers', icon: 'people', path: 'customers' },
        { name: 'Users', icon: 'people', path: 'users' },
        { name: 'Testimonials', icon: 'reviews', path: 'testimonials' },
        { name: 'Categories', icon: 'category', path: 'categories' },
        { name: 'Banner', icon: 'view_carousel', path: 'banners' },
        { name: 'Blog', icon: 'rss_feed', path: 'blogs' },
      ];
      if (desig_id === AdminRole.SUPER_ADMIN) {
        this.navList = [
          { name: 'Products', icon: 'inventory_2', path: 'products' },
          { name: 'Offers', icon: 'local_offer', path: 'offers' },
          // {
          //   name: 'Combo Products',
          //   icon: 'arrow_drop_down_circle',
          //   path: 'comboProducts',
          // },
          { name: 'Orders', icon: 'shopping_cart', path: 'orders' },
          { name: 'Users', icon: 'people', path: 'users' },
          { name: 'Testimonials', icon: 'reviews', path: 'testimonials' },
          { name: 'Categories', icon: 'category', path: 'categories' },
          // { name: 'Units', icon: 'addchart', path: 'units' },
          { name: 'Banner', icon: 'view_carousel', path: 'banners' },
          { name: 'Blog', icon: 'rss_feed', path: 'blogs' },
          { name: 'Event', icon: 'event', path: 'event' },
        ];
      }

      if (desig_id === AdminRole.BACK_OFFICE_USER) {
        this.navList = [
          { name: 'Orders', icon: 'shopping_cart', path: 'orders' },
          { name: 'Testimonials', icon: 'reviews', path: 'testimonials' },
        ];
      }

      if (desig_id === AdminRole.SHOPS) {
        this.navList = [
          { name: 'Orders', icon: 'shopping_cart', path: 'orders' },
        ];
      }
    });
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
