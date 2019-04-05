import { OrderService } from './../order.service';
import { Subscription } from 'rxjs';
import { Order } from './../../models/order.model';
import { Component, OnInit , OnDestroy } from '@angular/core';

@Component({
  selector: 'app-myorder',
  templateUrl: './myorder.component.html',
  styleUrls: ['./myorder.component.css']
})
export class MyorderComponent implements OnInit, OnDestroy  {
  public orders: Order[];
  private ordersSubscription: Subscription;

  constructor(public orderService: OrderService) {}

  ngOnInit() {
    this.ordersSubscription = this.orderService
      .getOrders()
      .subscribe((orders: Order[]) => {
        if (orders) {
          this.orders = orders;
          console.log('MyorderComponent this.orders ' + this.orders.length);
        }
      });
  }

  ngOnDestroy() {
      if ( this.ordersSubscription ) {
       this.ordersSubscription.unsubscribe();
      }
  }

}
