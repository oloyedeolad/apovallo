import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';


import {SERVER_API_URL} from '../../app.constant';
import {ILoginResponse, Login, LoginResponse} from '../model/login.model';


@Injectable({ providedIn: 'root' })
export class AuthServerProvider {
  constructor(private http: HttpClient, private $localStorage: LocalStorageService, private $sessionStorage: SessionStorageService) {}

  getToken(): string {
    return this.$localStorage.retrieve('authenticationToken') || this.$sessionStorage.retrieve('authenticationToken') || '';
  }

  login(credentials: Login): Observable<ILoginResponse> {
    return this.http
      .post<LoginResponse>(SERVER_API_URL + 'account/login/', credentials)
      .pipe(map((response: ILoginResponse) => this.authenticateSuccess(response, credentials.rememberMe)));
  }

  logout(): Observable<void> {
    return new Observable(observer => {
      this.$localStorage.clear('authenticationToken');
      this.$sessionStorage.clear('authenticationToken');
      observer.complete();
    });
  }

  private authenticateSuccess(response: ILoginResponse, rememberMe: boolean): ILoginResponse {
    const jwt = response.access;
    if (rememberMe) {
      this.$localStorage.store('user', response.user);
      this.$localStorage.store('authenticationToken', jwt);
    } else {
      console.log(jwt);
      this.$localStorage.store('user', response.user);
      this.$sessionStorage.store('authenticationToken', jwt);
    }
    return response;
  }
}
