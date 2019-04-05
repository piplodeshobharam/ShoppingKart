import { Component, OnInit ,OnDestroy } from '@angular/core';

import { CartService } from '../../shopping/cart.service';
import { CartItem } from './../../models/cart-item.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-checkout-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {
  public items: CartItem[];
  public total: number;
  public quantity: number;
  public cartSubscription: Subscription;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.items = this.cartService.getItems();
    this.total = this.cartService.getTotal();
    this.quantity =  this.items.length;
    this.cartSubscription = this.cartService.itemsChanged.subscribe(
      (items: CartItem[]) => {
        this.items = items;
        this.total = this.cartService.getTotal();
        this.quantity =  this.items.length;
      }
    );
  }

  ngOnDestroy() {
    if (this.cartSubscription) {
    this.cartSubscription.unsubscribe();
    }
  }
}
