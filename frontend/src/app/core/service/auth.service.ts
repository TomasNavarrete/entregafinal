import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';
import { environment,environmentAPI } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(email: string, pass: string) {
    return this.http
      .post<any>(`${environmentAPI.apiUrl}/login`, {
        "usuario":email,
        "clave":pass,
      })
      .pipe(
        map((user) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          var token=JSON.stringify(user["access_token"]);
          localStorage.setItem('currentUser', token);
          localStorage.setItem('choose_skin_active', 'cyan');
          this.currentUserSubject.next(user);
          return user;
        })
      );
  }

  olvidoclave(json){
    return this.http.post<any>(`${environmentAPI.apiUrl}/restablecer_clave`, json);
  }

  restablecer_clave_acep(json, token) {
    return this.http.post<any>(`${environmentAPI.apiUrl}/restablecer_clave_acep`, json, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    localStorage.removeItem('choose_skin_active');
    this.currentUserSubject.next(null);
    return of({ success: false });
  }
}
