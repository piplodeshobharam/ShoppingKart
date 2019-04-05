import { SnackbarComponent } from './../core/snackbar/snackbar.component';
import { EventEmitter, Injectable } from '@angular/core';
import { CartItem } from '../models/cart-item.model';

import { MatSnackBar } from '@angular/material';

@Injectable()
export class CartService {
  private cartItems: CartItem[];
  public itemsChanged: EventEmitter<CartItem[]> = new EventEmitter<CartItem[]>();

  constructor(private snackbar: MatSnackBar) {
    this.cartItems = [];
  }

  public getItems() {
    return this.cartItems.slice();
  }

  private getItemIds() {
    return this.getItems().map(cartItem => cartItem.product.id);
  }

  public addItem(item: CartItem) {
    if (this.getItemIds().includes(item.product.id)) {
      this.cartItems.forEach(function (cartItem) {
        if (cartItem.product.id === item.product.id) {
          cartItem.quantity += item.quantity;
        }
      });
      this.openSnackBar('Amount in cart changed for: ' + item.product.name);
    } else {
      this.cartItems.push(item);
     this.openSnackBar('Added to cart: ' + item.product.name);
    }
    this.itemsChanged.emit(this.cartItems.slice());
  }

  public addItems(items: CartItem[]) {
    items.forEach((cartItem) => {
      this.addItem(cartItem);
    });
  }

  public removeItem(item: CartItem) {
    const indexToRemove = this.cartItems.findIndex(element => element === item);
    this.cartItems.splice(indexToRemove, 1);
    this.itemsChanged.emit(this.cartItems.slice());
    this.openSnackBar('Deleted from cart: ' + item.product.name);
  }

  public updateItemQuantity(item: CartItem, newQuantity: number) {
    this.cartItems.forEach((cartItem) => {
      if (cartItem.product.id === item.product.id) {
        cartItem.quantity = newQuantity;
      }
    });
    this.itemsChanged.emit(this.cartItems.slice());
    this.openSnackBar('Updated amount for: ' + item.product.name);
  }

  public clearCart() {
    this.cartItems = [];
    this.itemsChanged.emit(this.cartItems.slice());
    this.openSnackBar('Cleared cart');
  }

  public getTotal() {
    let total = 0;
    this.cartItems.forEach((cartItem) => {
      total += cartItem.quantity * cartItem.product.price;
    });
    return total;
  }

  openSnackBar(message: string) {
    this.snackbar.openFromComponent(SnackbarComponent, {
      data: message,
      duration: 3000,
    });
  }
}
