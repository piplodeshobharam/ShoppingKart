import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy} from '@angular/core';

import { AuthService } from './../../auth/auth.service';
import { CartService } from '../../shopping/cart.service';

import { User } from '../../models/user.model';
import { CartItem } from '../../models/cart-item.model';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  public user: User;
  public quantity: number;
  private cartSubscription: Subscription;

  constructor(private authService: AuthService, private router: Router, private cartService: CartService) { }

   ngOnInit() {
    this.authService.userInfo$.subscribe(userInfo =>  this.user = userInfo);

    this.cartSubscription = this.cartService.itemsChanged.subscribe(
      (items: CartItem[]) => {
        this.quantity =  items.length;
      }
    );
  }

  onLogout() {
    console.log('onLogout') ;
    this.authService.signOut();
    this.router.navigate(['/']);
  }

  isAuthenticate() {
    return this.authService.isAuthenticate();
  }

  ngOnDestroy() {
    if ( this.cartSubscription ) {
    this.cartSubscription.unsubscribe();
    }
  }
}
