import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MykartComponent } from './mykart/mykart.component';
import { MyorderComponent } from './myorder/myorder.component';
import { MywishlistComponent } from './mywishlist/mywishlist.component';

import { ShoppingRoutingModule } from './shopping-routing.module';
import { SharedModule } from '../shared/shared-module';
import { CoreModule } from './../core/core-module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    MykartComponent,
    MyorderComponent,
    MywishlistComponent],
  imports: [
    CommonModule,
    CoreModule,
    ShoppingRoutingModule,
    SharedModule,
    FormsModule,
    RouterModule],
  exports: [
      SharedModule
  ],
})
export class ShoppingModule {}
