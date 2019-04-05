import {combineLatest as observableCombineLatest,  Observable ,  from as fromPromise ,  of } from 'rxjs';
import { Injectable , EventEmitter } from '@angular/core';
import { catchError ,  tap, switchMap, map } from 'rxjs/operators';

import { Product } from './../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private selectedProducts: Product[];
  private allProducts: Product[];
  public itemsChanged: EventEmitter<Product[]> = new EventEmitter<Product[]>();

  constructor() {
    this.allProducts = this.getProducts();
  }

   public getProducts(): Product[] {
    return[{
      id : 101,
      name : 'Apple iPhone XS Max (Silver, 64 GB)',
      price : 109900,
      offerprice : 99000,
      currency : 'Rs',
      description : ['64 GB ROM',
      '16.51 cm (6.5 inch) Super Retina HD Display',
      '12MP + 12MP | 7MP Front Camera',
      'A12 Bionic Chip Processor'],
      category: 'iPhone',
      imageURLs : ['https://rukminim1.flixcart.com/image/312/312/jm9hfgw0/mobile/c/2/j/apple-iphone-xs-max-mt542hn-a-original-imaf97f6n9eg9be4.jpeg?q=70',
      'https://rukminim1.flixcart.com/image/832/832/jm9hfgw0/mobile/c/2/j/apple-iphone-xs-max-mt542hn-a-original-imaf97f6dxsrjzwh.jpeg?q=70',
      'https://rukminim1.flixcart.com/image/832/832/jm9hfgw0/mobile/c/2/j/apple-iphone-xs-max-mt542hn-a-original-imaf97f6jsmqt5zh.jpeg?q=70'],
      os: 'iphone',
      isNew: true
      },
      {
      id : 102,
      name : 'Apple iPhone XS Max (Gold, 256 GB)',
      price : 124900,
      offerprice : 120000,
      currency : 'Rs',
      description : ['256 GB ROM',
      '16.51 cm (6.5 inch) Super Retina HD Display',
      '12MP + 12MP | 7MP Front Camera',
      'A12 Bionic Chip Processor'],
      category: 'iPhone',
      imageURLs : [ 'https://rukminim1.flixcart.com/image/832/832/jm9hfgw0/mobile/e/8/s/apple-iphone-xs-max-mt522hn-a-original-imaf97f6hmng8ufu.jpeg?q=70',
      'https://rukminim1.flixcart.com/image/832/832/jm9hfgw0/mobile/e/8/s/apple-iphone-xs-max-mt522hn-a-original-imaf97f63ngfuvv9.jpeg?q=70',
      'https://rukminim1.flixcart.com/image/832/832/jm9hfgw0/mobile/e/8/s/apple-iphone-xs-max-mt522hn-a-original-imaf97f6vzzxdq4p.jpeg?q=70',
      'https://rukminim1.flixcart.com/image/832/832/jm9hfgw0/mobile/e/8/s/apple-iphone-xs-max-mt522hn-a-original-imaf97f6vcszfskm.jpeg?q=70'],
      os: 'iphone',
      isNew: true
      },
      {
      id : 103,
      name : 'Apple iPhone XS Max (Space Grey, 512 GB)',
      price : 144500,
      offerprice : 120000,
      currency : 'Rs',
      description : [ '512 GB ROM',
      '16.51 cm (6.5 inch) Super Retina HD Display',
      '12MP + 12MP | 7MP Front Camera',
      'A12 Bionic Chip Processor'],
      category: 'iPhone',
      imageURLs : ['https://rukminim1.flixcart.com/image/832/832/jm9hfgw0/mobile/f/t/a/apple-iphone-xs-max-mt532hn-a-original-imaf97f6y3spd7yz.jpeg?q=70',
      'https://rukminim1.flixcart.com/image/832/832/jm9hfgw0/mobile/f/t/a/apple-iphone-xs-max-mt532hn-a-original-imaf97f6tebqhzpv.jpeg?q=70',
      'https://rukminim1.flixcart.com/image/832/832/jm9hfgw0/mobile/j/x/g/apple-iphone-xs-max-mt562hn-a-original-imaf97f6xkzykuft.jpeg?q=70',
      'https://rukminim1.flixcart.com/image/832/832/jm9hfgw0/mobile/j/x/g/apple-iphone-xs-max-mt562hn-a-original-imaf97f6zsezgvjy.jpeg?q=70'],
      os: 'iphone',
      isNew: false
      },
      {
        id : 104,
        name : 'Apple iPhone XS Max (Space Grey, 512 GB)',
        price : 144500,
        offerprice : 12000,
        currency : 'Rs',
        description : [ '512 GB ROM',
        '16.51 cm (6.5 inch) Super Retina HD Display',
        '12MP + 12MP | 7MP Front Camera',
        'A12 Bionic Chip Processor'],
        category: 'iPhone',
        imageURLs : ['https://rukminim1.flixcart.com/image/832/832/jm9hfgw0/mobile/f/t/a/apple-iphone-xs-max-mt532hn-a-original-imaf97f6y3spd7yz.jpeg?q=70',
        'https://rukminim1.flixcart.com/image/832/832/jm9hfgw0/mobile/f/t/a/apple-iphone-xs-max-mt532hn-a-original-imaf97f6tebqhzpv.jpeg?q=70',
        'https://rukminim1.flixcart.com/image/832/832/jm9hfgw0/mobile/j/x/g/apple-iphone-xs-max-mt562hn-a-original-imaf97f6xkzykuft.jpeg?q=70',
        'https://rukminim1.flixcart.com/image/832/832/jm9hfgw0/mobile/j/x/g/apple-iphone-xs-max-mt562hn-a-original-imaf97f6zsezgvjy.jpeg?q=70'],
        os: 'iphone',
        isNew: false
        },
        {
          id : 201,
          name : 'Mi Mix 2 (Black, 128 GB)  (6 GB RAM)',
          price : 29999,
          offerprice : 25000,
          currency : 'Rs',
          description : ['6 GB RAM | 128 GB ROM','15.21 cm (5.99 inch) Full HD+ Display','12MP Rear Camera | 5MP Front Camera','3400 mAh Li-polymer Battery','Qualcomm Snapdragon 835 Octa Core 2.5 GHz Processor'],
          imageURLs : ['https://rukminim1.flixcart.com/image/832/832/j8bxvgw0-1/mobile/g/j/z/mi-mi-mix-2-na-original-imaeydgnjzmvxwfz.jpeg?q=70',
          'https://rukminim1.flixcart.com/image/832/832/j8bxvgw0-1/mobile/g/j/z/mi-mi-mix-2-na-original-imaeydhebkyfgqce.jpeg?q=70',
          'https://rukminim1.flixcart.com/image/832/832/j8bxvgw0-1/mobile/g/j/z/mi-mi-mix-2-na-original-imaeydhb2yq68wpx.jpeg?q=70'],
          category: 'MI',
          os: 'android',
          isNew: false
          },
          {
          id : 202,
          name : 'Redmi Note 7 (Sapphire Blue, 64 GB)  (4 GB RAM)',
          price : 11990,
          offerprice : 10000,
          currency : 'Rs',
          description : ['4 GB RAM | 64 GB ROM | Expandable Upto 256 GB','16.0 cm (6.3 inch) FHD+ Display','12MP + 2MP | 13MP Front Camera','4000 mAh Li-polymer Battery','Qualcomm Snapdragon 660 AIE Processor'],
          imageURLs : [ 'https://rukminim1.flixcart.com/image/832/832/jskofww0/mobile/v/z/z/mi-redmi-note-7-na-original-imafe48ru3s66sjd.jpeg?q=70',
          'https://rukminim1.flixcart.com/image/832/832/jskofww0/mobile/v/z/z/mi-redmi-note-7-na-original-imafe48th9nzaenh.jpeg?q=70',
          'https://rukminim1.flixcart.com/image/832/832/jskofww0/mobile/v/z/z/mi-redmi-note-7-na-original-imafe48skjv5tznp.jpeg?q=70',
          'https://rukminim1.flixcart.com/image/832/832/jskofww0/mobile/v/z/z/mi-redmi-note-7-na-original-imafe48u3fxwngew.jpeg?q=70'],
          category: 'MI',
          os: 'android',
          isNew: true
          },
          {
          id : 203,
          name : 'Google Pixel 3 (Clearly White, 128 GB)  (4 GB RAM)',
          price : 69999,
          offerprice : 59999,
          currency : 'Rs',
          description : [ '4 GB RAM | 128 GB ROM','13.97 cm (5.5 inch) FHD+ Display','12.2MP Rear Camera | 8MP + 8MP Dual Front Camera','2915 mAh Battery','Qualcomm Snapdragon 845 64-bit Processor'],
          imageURLs : ['https://rukminim1.flixcart.com/image/832/832/jn0msnk0/mobile/9/p/z/google-pixel-3-na-original-imaf9sxrrrgzhf44.jpeg?q=70',
          'https://rukminim1.flixcart.com/image/832/832/jn0msnk0/mobile/9/p/z/google-pixel-3-na-original-imaf9sxrrreggeyf.jpeg?q=70',
          'https://rukminim1.flixcart.com/image/832/832/jn0msnk0/mobile/9/p/z/google-pixel-3-na-original-imaf9sxrngstnywg.jpeg?q=70',
          'https://rukminim1.flixcart.com/image/832/832/jn0msnk0/mobile/9/p/z/google-pixel-3-na-original-imaf9sxr6qn6c8br.jpeg?q=70'],
           category: 'Google',
           os: 'android',
           isNew: false
          },
        {
          id : 204,
          name : 'Samsung Galaxy S10 (Prism Black, 128 GB)  (8 GB RAM)',
          price : 66000,
          offerprice : 60000,
          currency : 'Rs',
          description : [ '8 GB RAM | 128 GB ROM | Expandable Upto 512 GB','15.49 cm (6.1 inch) Quad HD+ Display','16MP + 12MP + 12MP | 10MP Front Camera','3400 mAh Lithium-ion Battery','Exynos 9 9820 Processor'],
          imageURLs : ['https://rukminim1.flixcart.com/image/832/832/jsdj8nk0/mobile/m/h/a/samsung-galaxy-s10-sm-g973fzkdins-original-imafdys4755vhhfj.jpeg?q=70',
          'https://rukminim1.flixcart.com/image/832/832/jsdj8nk0/mobile/m/h/a/samsung-galaxy-s10-sm-g973fzkdins-original-imafdys4thzxaejh.jpeg?q=70',
          'https://rukminim1.flixcart.com/image/832/832/jsdj8nk0/mobile/m/h/a/samsung-galaxy-s10-sm-g973fzkdins-original-imafdys4bnydt8vs.jpeg?q=70',
          'https://rukminim1.flixcart.com/image/832/832/jsdj8nk0/mobile/m/h/a/samsung-galaxy-s10-sm-g973fzkdins-original-imafdys4m6pzbthn.jpeg?q=70'],
           category: 'Samsung',
           os: 'android',
           isNew: true
          },
        {
          id : 205,
          name : 'LG G7+ ThinQ (Blue, 128 GB)  (6 GB RAM)',
          price : 40000,
          offerprice : 32000,
          currency : 'Rs',
          description : [ '6 GB RAM | 128 GB ROM | Expandable Upto 2 TB','15.49 cm (6.1 inch) Quad HD+ Display','16MP + 16MP | 8MP Front Camera','3000 mAh Li-ion Battery','Qualcomm Snapdragon 845 Processor'],
          imageURLs : ['https://rukminim1.flixcart.com/image/832/832/jr6o13k0/mobile/r/b/9/lg-g7-thinq-lm-g710eaw-original-imafdfc6xhhcufrs.jpeg?q=70',
          'https://rukminim1.flixcart.com/image/832/832/jr6o13k0/mobile/r/b/9/lg-g7-thinq-lm-g710eaw-original-imafdfc6awbctsyq.jpeg?q=70',
          'https://rukminim1.flixcart.com/image/832/832/jr6o13k0/mobile/r/b/9/lg-g7-thinq-lm-g710eaw-original-imafdfc6zazb6jzh.jpeg?q=70',
          'https://rukminim1.flixcart.com/image/832/832/jr6o13k0/mobile/r/b/9/lg-g7-thinq-lm-g710eaw-original-imafdfc63haqufs7.jpeg?q=70'],
           category: 'LG',
           os: 'android',
           isNew: false
          }];
  }

  private initProductByOs(selectedOS: string) {
    this.selectedProducts =  this.allProducts.filter(( product ) => product.os === selectedOS);
    this.itemsChanged.emit(this.selectedProducts.slice());
  }

  public getProductByOs(selectedOS: string) {
    this.initProductByOs(selectedOS);
    return this.selectedProducts.slice();
  }

  public getNewProducts() {
    this.selectedProducts = this.allProducts.filter(( product ) => product.isNew);
    this.itemsChanged.emit(this.selectedProducts.slice());
    return this.selectedProducts.slice();
  }

  public findProducts(term: string) {
    this.selectedProducts = this.allProducts.filter(product => product.name.toLowerCase().includes(term));
    this.itemsChanged.emit(this.selectedProducts.slice());
    return Observable.of((this.selectedProducts.slice()));
  }

}
