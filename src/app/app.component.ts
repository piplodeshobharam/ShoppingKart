import {  Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  status = true;

  constructor( private router: Router) {}

  ngOnInit() {
    this.router.events
    .subscribe((event) => {
    if (event instanceof NavigationEnd) {
      this.status = true;
      if ( event.url === '/signin'
      || event.url === '/signup'
      || event.url === '/mykart'
      || event.url === '/myorder'
      || event.url === '/mywishlist'
      || event.url === '/checkout') {
        this.status = false;
      }
    }
  });

  }

  isProduct() {
    this.status = true;
  }

}
