import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignInComponent } from './sign-in/sign-in-component';
import { SignUpComponent } from './sign-up/sign-up-component';
import { AuthGuard } from './auth.guard';

const authRoutes: Routes = [
   { path: 'signin', component: SignInComponent},
   { path: 'signup', component: SignUpComponent}
];

@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AuthRoutingModule {}
