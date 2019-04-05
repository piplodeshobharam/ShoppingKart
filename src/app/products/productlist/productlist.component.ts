import { Component, OnInit, OnDestroy } from '@angular/core';

import { ProductService } from '../product.service';
import { CartService } from './../../shopping/cart.service';

import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { Product } from './../../models/product.model';
import { User } from './../../models/user.model';
import { CartItem } from './../../models/cart-item.model';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  public products: Product[];
  public user: User;
  public productsLoading: boolean;
  private productSubscription: Subscription;

  constructor(private router: Router, private productService: ProductService, private cartService: CartService) { }

  ngOnInit() {
    this.products = this.productService.getNewProducts();
    this.productSubscription = this.productService.itemsChanged.subscribe(
      (items: Product[]) => {
        this.products = items;
      }
    );
  }

  initList(selectedOS: string) {
    this.products  = this.productService.getProductByOs(selectedOS);
  }

  onAddToCart(product: Product) {
    this.cartService.addItem(new CartItem(product, 1));
  }

  onBuyNow(product: Product) {
    this.onAddToCart(product);
    this.router.navigate(['/checkout']);
  }

  ngOnDestroy() {
    if ( this.productSubscription ) {
     this.productSubscription.unsubscribe();
    }
  }
}
