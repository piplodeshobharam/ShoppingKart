import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from '../auth.service';
import { Router} from '@angular/router';

import { SnackbarComponent } from '../../core/snackbar/snackbar.component';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up-component.html',
  styleUrls: ['./sign-up-component.css']
})
export class SignUpComponent implements OnInit {
  public signUpForm: FormGroup;
  public registerErrors: string;
  isLoading: boolean;

  constructor(private authenticationService: AuthService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.initRegisterForm();
  }

  private initRegisterForm() {
    this.signUpForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      confirmpassword: new FormControl(null, Validators.required)
    });
  }

  public onSignUp() {
    if (this.signUpForm.value.password !== this.signUpForm.value.confirmpassword) {
      console.log('Passwords don\'t match!');
      this.openSnackBar('Passwords don\'t match!');
    } else {
      this.isLoading = true;
      this.authenticationService.emailSignUp(this.signUpForm.value.email, this.signUpForm.value.password)
        .subscribe(
          () => {
            this.isLoading = false;
            this.openSnackBar('Account created successfully');
            this.router.navigate(['/']);
          },
          err => {
            this.isLoading = false;
            console.log('Sign Up failed!');
            this.openSnackBar('Sign Up failed!');
          }
        );

    }
  }

  openSnackBar(message: string) {
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: message,
      duration: 3000,
    });
  }
}
