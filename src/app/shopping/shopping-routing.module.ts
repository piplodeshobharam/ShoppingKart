import { CompleteComponent } from './checkout/complete/complete.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MykartComponent } from './mykart/mykart.component';
import { MyorderComponent } from './myorder/myorder.component';
import { MywishlistComponent } from './mywishlist/mywishlist.component';
import { CheckoutComponent } from './checkout/checkout.component';

import { AuthGuard } from './../auth/auth.guard';

const shoppingRoutes: Routes = [
  { path: 'mykart', component: MykartComponent },
  { path: 'myorder', component: MyorderComponent,  canActivate: [AuthGuard] },
  { path: 'mywishlist', component: MywishlistComponent,  canActivate: [AuthGuard ]},
  { path: 'checkout', component: CheckoutComponent },
  { path: 'order-complete', component: CompleteComponent },
];

@NgModule({
  imports: [RouterModule.forChild(shoppingRoutes)],
  exports: [RouterModule]
})
export class ShoppingRoutingModule {}
