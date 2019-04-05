import { Component, OnInit } from '@angular/core';
import { Carousel } from './../../../models/carousel.model';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
  carouselUrls: Carousel[] = [
    { index : 0,
      url: 'https://rukminim1.flixcart.com/flap/50/50/image/9fddb61f281042c8.jpg?q=50',
      category : 'iPhone',
      slideName : 'SlideName'
    },
    { index : 1,
      url: 'https://rukminim1.flixcart.com/flap/50/50/image/76e02b73a6fd5aa7.jpg?q=50',
      category : 'iPhone',
      slideName : 'SlideName'
    },
    { index : 2,
      url: 'https://rukminim1.flixcart.com/flap/50/50/image/76e02b73a6fd5aa7.jpg?q=50',
      category : 'iPhone',
      slideName : 'SlideName'
    }
  ];

  constructor() { }

  ngOnInit() {
  }



}
