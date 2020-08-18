import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AuthServerProvider} from './auth-jwt.service';
import {Login, LoginResponse} from '../model/login.model';
import {ToastrService} from 'ngx-toastr';


@Injectable({ providedIn: 'root' })
export class LoginService {
  constructor( private authServerProvider: AuthServerProvider, private toaster: ToastrService) {}

  login(credentials: Login): Observable<void> {
    return this.authServerProvider.login(credentials).pipe(map((res: LoginResponse) => this.authAlert(res)));
  }

  logout(): void {
    this.authServerProvider.logout().subscribe(null, null, () => this.toaster.success('You successfully logged out'));
  }

  private authAlert(res: LoginResponse) {
    if (!res) {
      this.toaster.error('Wrong username and password');
    } else {
      this.toaster.success('Login successful');
    }
  }
}
