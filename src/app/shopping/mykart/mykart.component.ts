import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { CartService } from './../cart.service';

import { CartItem } from './../../models/cart-item.model';

@Component({
  selector: 'app-mykart',
  templateUrl: './mykart.component.html',
  styleUrls: ['./mykart.component.css']
})
export class MykartComponent implements OnInit, OnDestroy {
  public items: CartItem[];
  public total: number;
  public quantity: number;

  private cartSubscription: Subscription;

  constructor(private router: Router, private cartService: CartService) { }

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

  public onRemoveItem(event, item: CartItem) {
    event.stopPropagation();
    this.cartService.removeItem(item);
  }

  onQuantityChanges(quantity: number, item: CartItem) {
   this.cartService.updateItemQuantity(item, quantity);
   }

  onContinueShopping() {
    this.router.navigate(['/']);
  }

  onCheckOut() {
    this.router.navigate(['/checkout']);
  }

  ngOnDestroy() {
    if ( this.cartSubscription ) {
    this.cartSubscription.unsubscribe();
    }
  }
}
