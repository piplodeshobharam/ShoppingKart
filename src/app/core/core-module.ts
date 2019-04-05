import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {CategoryListComponent} from './categorylist/categorylist.component';
import { ContentComponent } from './content/content.component';
import {HomeComponent} from './home/home.component';
import { CarouselComponent } from './home/carousel/carousel.component';

import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../shared/shared-module';

import { AuthService } from '../auth/auth.service';
import { ProductService } from '../products/product.service';

import { CartService } from '../shopping/cart.service';
import { OrderService } from '../shopping/order.service';

import { SnackbarComponent } from './snackbar/snackbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ProductListComponent } from './../products/productlist/productlist.component';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    CategoryListComponent,
    ContentComponent,
    CarouselComponent,
    HomeComponent,
    SnackbarComponent,
    SidebarComponent,
    ProductListComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    CategoryListComponent,
    ContentComponent,
    CarouselComponent,
    SnackbarComponent,
    SidebarComponent,
    ProductListComponent,
    SearchComponent
  ],
  entryComponents: [SnackbarComponent],
  providers: [
    AuthService,
    ProductService,
    CartService,
    OrderService]
})
export class CoreModule { }
