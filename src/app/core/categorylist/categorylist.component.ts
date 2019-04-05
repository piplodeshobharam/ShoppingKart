import { Component, OnInit , ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material';

import { ProductListComponent } from './../../products/productlist/productlist.component';

export interface Item {
  id: number;
  name: string;
  os: string;
}

@Component({
  providers: [ProductListComponent],
  selector: 'app-categorylist',
  templateUrl: './categorylist.component.html',
  styleUrls: ['./categorylist.component.css']
})
export class CategoryListComponent implements OnInit {
  items = [
    {id: 1, name: 'Android', os: 'android'},
    {id: 2, name: 'iPhone', os: 'iphone'}
  ];

  public selectedMenuItem: Item;

  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;

  constructor(private productList: ProductListComponent) {}

  ngOnInit() {}

  onContextMenuAction(item: Item) {
    this.selectedMenuItem  = item ;
    console.log('onContextMenuAction: name ' +  this.selectedMenuItem);
    this.productList.initList(item.os);
  }
}
