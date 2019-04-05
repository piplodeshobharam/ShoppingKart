import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder} from '@angular/forms';

import { CheckoutService } from '../shared/checkout.service';

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  public formPayment: FormGroup;
  selectedPaymentMethod: string;
  paymentMethods = ['Credit/Debit/ATM Card', 'Bhim UPI', 'Net Banking'];

  constructor(private checkoutService: CheckoutService, private formBuilder
    : FormBuilder    ) { }

  ngOnInit() {
    this.paymentMethods = ['Credit/Debit/ATM Card', 'Bhim UPI', 'Net Banking'];
    this.formPayment = new FormGroup({
      'paymentMethod': new FormControl(this.paymentMethods[0], Validators.required)
    });
  }

  public onSubmit() {
    console.log('paymentMethod:' + this.selectedPaymentMethod);
    this.checkoutService.setPaymentMethod(this.selectedPaymentMethod);
  }

}
