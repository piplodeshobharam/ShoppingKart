import { CheckoutService } from './shared/checkout.service';
import { NgModule } from '@angular/core';
import { AddressComponent } from './address/address.component';
import { PaymentComponent } from './payment/payment.component';
import { ReviewComponent } from './review/review.component';
import { CheckoutComponent } from './checkout.component';
import { SharedModule } from '../../shared/shared-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CompleteComponent } from './complete/complete.component';
import { CommonModule } from '@angular/common';
import { CoreModule } from 'src/app/core/core-module';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        CheckoutComponent,
        AddressComponent,
        PaymentComponent,
        ReviewComponent,
        CompleteComponent
    ],
    imports: [
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        CoreModule,
        RouterModule,
    ],
    exports: [
        SharedModule,
        CheckoutComponent,
        AddressComponent,
        PaymentComponent,
        ReviewComponent,
        FormsModule,
        ReactiveFormsModule,
        CoreModule
    ],
    providers: [ CheckoutService ]
})
export class CheckoutModule {}
