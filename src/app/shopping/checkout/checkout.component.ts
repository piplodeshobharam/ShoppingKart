import { Component, OnDestroy, OnInit } from '@angular/core';
import { CheckoutService } from './shared/checkout.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  steps: string[];

  constructor(private checkoutService: CheckoutService) {}

  ngOnInit() {
    this.steps = ['1. Address', '2. Payment', '3. Review'];
  }
}
