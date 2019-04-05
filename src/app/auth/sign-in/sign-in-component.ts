import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

import { SnackbarComponent } from '../../core/snackbar/snackbar.component';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in-component.html',
  styleUrls: ['./sign-in-component.css']
})
export class SignInComponent implements OnInit {
  loginForm: FormGroup;
  isLoading: boolean;
  message: string;

  constructor(
    private authenticationService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl('', { validators: [Validators.required] })
    });
  }

  public onLogin() {
    this.isLoading = true;
    this.authenticationService
      .emailLogin(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe(
        () => {
          this.isLoading = false;
          this.openSnackBar('Login successful!');
          this.router.navigate(['/']);
        },
       err => this.onError(err)
      );
  }

  onError(error) {
    this.isLoading = false;
    if (error.code === 'auth/user-not-found') {
      console.log('signin-login-onError ' + error.code);
      this.openSnackBar('Incorrect EmailId');
    } else if (error.code === 'auth/wrong-password') {
      console.log('signin-login-onError ' + error.code);
      this.openSnackBar(' Incorrect password !');
    }
  }

  openSnackBar(message: string) {
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: message,
      duration: 3000,
    });
  }
}
