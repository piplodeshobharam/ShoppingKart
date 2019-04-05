import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilterComponent } from './filter/filter.component';
import { ProductDetailComponent } from './productdetail/productdetail.component';

import { SharedModule } from '../shared/shared-module';
import { AppRoutingModule } from '../app-routing.module';
import { CoreModule } from './../core/core-module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    FilterComponent,
    ProductDetailComponent],
  imports: [
    CommonModule,
    SharedModule,
    CoreModule,
    AppRoutingModule,
    FormsModule
  ],
  exports: [
    FilterComponent,
    ProductDetailComponent]
})
export class ProductsModule { }
