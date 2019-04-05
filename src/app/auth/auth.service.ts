import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from './../models/user.model';

import {Observable, Subject, BehaviorSubject} from 'rxjs/Rx';

@Injectable()
export class AuthService {
  static UNKNOWN_USER = new User(null);

  userInfo$: BehaviorSubject<User> = new BehaviorSubject<User>(AuthService.UNKNOWN_USER);

  constructor(
    private afAuth: AngularFireAuth) {
  }

  public emailSignUp(email: string, password: string) {
    return this.fromFirebaseAuthPromise(this.afAuth.auth.createUserWithEmailAndPassword(email, password));
  }

  emailLogin(email: string, password: string): Observable<User> {
    return this.fromFirebaseAuthPromise(this.afAuth.auth.signInWithEmailAndPassword(email, password));
  }

  fromFirebaseAuthPromise(promise): Observable<any> {
    const subject = new Subject<any>();

    promise
        .then(res => {
                const userInfo = new User(this.afAuth.auth.currentUser);
                this.saveUserToLocal(userInfo);
                this.userInfo$.next(userInfo);
                subject.next(res);
                subject.complete();
            },
            err => {
                this.userInfo$.error(err);
                subject.error(err);
                subject.complete();
            });

    return subject.asObservable();
}


  public signOut() {
    this.afAuth.auth.signOut();
    this.userInfo$.next(AuthService.UNKNOWN_USER);
    this.clearLocalStorage();
  }

  saveUserToLocal(userInfo: User) {
    if ( userInfo) {
    localStorage.setItem('user', JSON.stringify(userInfo));
    }
  }

  getUserFromLocal(): User {
    return JSON.parse(localStorage.getItem('user'));
  }

  clearLocalStorage() {
    localStorage.removeItem('user');
  }

  isAuthenticate() {
    return this.getUserFromLocal() != null ;
  }
}
