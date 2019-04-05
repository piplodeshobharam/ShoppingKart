import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Product } from './../../models/product.model';
import { CartItem } from './../../models/cart-item.model';

import { ProductService } from './../../products/product.service';
import { CartService } from './../../shopping/cart.service';

@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.component.html',
  styleUrls: ['./productdetail.component.css']
})
export class ProductDetailComponent implements OnInit {
  @Input() public product: Product;
  public activeImageUrl: string;
  public activeImageIndex: number;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService ) { }

  ngOnInit() {
    this.getProduct();
  }

  private getProduct() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.product = this.productService.getProducts().filter(( product ) => product.id === id)[0];
    this.activeImageUrl = this.product.imageURLs[0];
  }

  public onSelectThumbnail(event, index) {
    event.preventDefault();
    this.activeImageUrl = this.product.imageURLs[index];
    this.activeImageIndex = index;
  }

  onAddToCart(product: Product) {
    this.cartService.addItem(new CartItem(product, 1));
  }

  onBuyNow(product: Product) {
    this.onAddToCart(product);
    this.router.navigate(['/checkout']);
  }
}
