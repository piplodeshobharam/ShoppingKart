import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';

import { AuthService } from '../../../auth/auth.service';
import { CheckoutService } from '../shared/checkout.service';

@Component({
  selector: 'app-checkout-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit, OnDestroy {
  private authSubscription: Subscription;
  @Input() public user;
  public formAddress: FormGroup;
  public countries: string[];


  constructor(
    private checkoutService: CheckoutService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.initFormGroup();

    this.authSubscription = this.authService.userInfo$.subscribe((user) => {
      if (user) {
        this.user = user;
        this.initFormGroup();
      }
    });
  }

  private initFormGroup() {
    this.countries = ['India'];
    this.formAddress = new FormGroup({
      firstname: new FormControl(
        this.user && this.user.firstName,
        Validators.required
      ),
      lastname: new FormControl(
        this.user && this.user.lastName,
        Validators.required
      ),
      address1: new FormControl(null, Validators.required),
      address2: new FormControl(null),
      zip: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^\d\d\d\d$/)
      ]),
      city: new FormControl(null, Validators.required),
      email: new FormControl(
        this.user && this.user.email,
        Validators.email
      ),
      phone: new FormControl(null),
      company: new FormControl(null),
      country: new FormControl({ value: this.countries[0], disabled: false })
    });
  }


  public onSubmit() {
     this.checkoutService.setCustomer(this.formAddress.value);
  }

  // Debug: Fill Form Helper MEthod
  public onFillForm(event: Event) {
    event.preventDefault();
    this.formAddress.setValue({
      firstname: 'Shobharam ',
      lastname: 'Piplode',
      address1: 'Hinjewadi',
      address2: '',
      zip: 1234,
      city: 'Pune',
      email: 'shobharam.piplode@gmail.com',
      phone: '+9561376480',
      company: 'TCS',
      country: 'India'
    });
  }

  ngOnDestroy() {
    if ( this.authSubscription) {
    this.authSubscription.unsubscribe();
    }
  }
}
