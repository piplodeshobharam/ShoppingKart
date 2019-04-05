import { Product } from './product.model';

export class CartItem {
  constructor(public product: Product,
    public quantity: number,
    public cartId = Math.floor(Math.random() * Math.floor(100))) {}
}
