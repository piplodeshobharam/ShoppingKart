import { Injectable, OnInit } from '@angular/core';
import { Observable ,  of ,  from as fromPromise, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { Order } from '../models/order.model';
import { AuthService } from '../auth/auth.service';
import { User } from './../models/user.model';

@Injectable()
export class OrderService {
  private orders: Order[];
  private anonymousUser = 'AnonymousUser';

  public user: User;

  constructor(
    private authService: AuthService,
    private store: AngularFirestoreModule
  ) {
    this.orders = [];
  }

  public getOrders() {
    this.authService.userInfo$
    .subscribe((userInfo) => {
      if (userInfo) {
        this.user = userInfo;
      }
    });
    const userUid = this.user ? this.user.uid : '';
    console.log('userUid ' + userUid);
    if (userUid) {
      const data = localStorage.getItem(userUid);
      if (data) {
        this.orders = JSON.parse(data);
        console.log('this.orders ' + this.orders.length);
        return Observable.of(this.orders);
      }
    } else {
      const data = localStorage.getItem(this.anonymousUser);
      if ( data) {
        this.orders = JSON.parse(data);
        console.log('this.orders ' + this.orders.length);
        return Observable.of(this.orders);
      }
    }
  }

  public addUserOrder(order: Order, total: number, userid: string) {
    const orderWithMetaData = {
      ...order,
      ...this.constructOrderMetaData(order),
      total
    };
    console.log('addUserOrder- orderWithMetaData' + orderWithMetaData);

    const data = localStorage.getItem(userid);
    if ( data) {
      this.orders = JSON.parse(data);
    }
    this.orders.push(orderWithMetaData);
    localStorage.setItem(userid, JSON.stringify(this.orders));

    this.orders = JSON.parse(localStorage.getItem(userid));
    console.log('addUserOrder - orders lenght ' + this.orders.length);
    if (this.orders) {
      return true;
    }
    return false;
  }

  public addAnonymousOrder(order: Order, total: number) {
    const orderWithMetaData = {
      ...order,
      ...this.constructOrderMetaData(order),
      total
    };
    console.log('addAnonymousOrder- orderWithMetaData' + orderWithMetaData);

    const data = localStorage.getItem(this.anonymousUser);
    console.log('addAnonymousOrder - data ' + data);
    if ( data) {
      this.orders = JSON.parse(data);
    }
    this.orders.push(orderWithMetaData);
    localStorage.setItem(this.anonymousUser, JSON.stringify(this.orders));

    this.orders = JSON.parse(localStorage.getItem(this.anonymousUser));
    console.log('addUserOrder - orders lenght ' + this.orders.length);
    if ( this.orders ) {
      return true;
    }
    return false;
  }

  private constructOrderMetaData(order: Order) {
    return {
      number: (Math.random() * 10000000000).toString().split('.')[0],
      date: new Date().toString(),
      status: 'In Progress'
    };
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
     //  this.messageService.addError(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
