import {
  Component,
  OnInit,
} from '@angular/core';

import { ProductService } from './../../products/product.service';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Product } from './../../models/product.model';

import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { SnackbarComponent } from '../snackbar/snackbar.component';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  products: Product[];
  searchForm: FormGroup;
  isLoading: boolean;

  constructor(private productService: ProductService,  private router: Router, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.searchForm  = new FormGroup({
        search: new FormControl('', { validators: [Validators.required] })
      });
  }

  public onSearch() {
    this.isLoading = true;
    console.log('onSearch-' + this.searchForm.value.search);
    this.productService.findProducts(this.searchForm.value.search)
      .subscribe(
        (data) => {
          this.products = data;
          this.isLoading = false;
          this.router.navigate(['/products']);
        },
        err => {
          this.isLoading = false;
          this.openSnackBar('Product not found!');
        }
      );
  }

  openSnackBar(message: string) {
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: message,
      duration: 3000,
    });
  }
}
