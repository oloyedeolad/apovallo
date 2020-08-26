import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AuthServerProvider} from './auth-jwt.service';
import {Login, LoginResponse} from '../model/login.model';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {IExchangeRate} from '../../@pages/layouts/simplywhite/transactions/country.model';
import {SERVER_API_URL} from '../../app.constant';

type EntityResponseType = HttpResponse<string>;

@Injectable({ providedIn: 'root' })
export class LoginService {
  public resourceUrl = SERVER_API_URL + 'user/password_reset/';
  constructor( private authServerProvider: AuthServerProvider, private toaster: ToastrService, private router: Router,
               protected http: HttpClient) {}

  login(credentials: Login): Observable<void> {
    return this.authServerProvider.login(credentials).pipe(map((res: LoginResponse) => this.authAlert(res)));
  }

  logout(): void {
    this.authServerProvider.logout().subscribe(null, null, () => {
      this.toaster.success('You successfully logged out');
      this.router.navigate(['']);
    });
  }

  private authAlert(res: LoginResponse) {
    if (!res) {
      this.toaster.error('Wrong username and password');
    } else {
      this.toaster.success('Login successful');
    }
  }

  resetPassword(payRequest: string): Observable<EntityResponseType> {
    return  this.http
        .post<string>(`${this.resourceUrl}reset_password/`, payRequest, {observe: 'response'})
        .pipe(map((res: EntityResponseType) => res));
  }

  newPassword(token: any): Observable<EntityResponseType> {
    return  this.http
        .post<string>(`${this.resourceUrl}confirm/`, token, {observe: 'response'})
        .pipe(map((res: EntityResponseType) => res));
  }

  confirmToken(token: any): Observable<EntityResponseType> {
    return  this.http
        .post<string>(`${this.resourceUrl}reset_password/validate_token/`, token, {observe: 'response'})
        .pipe(map((res: EntityResponseType) => res));
  }
}
