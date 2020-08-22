import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {LocalStorageService} from 'ngx-webstorage';


@Injectable({ providedIn: 'root' })
export class AuthGuardService implements CanActivate {
    constructor(private $localStorage: LocalStorageService, public router: Router) {}
    canActivate(): boolean {
        if (this.$localStorage.retrieve('authenticationToken') === null) {
            this.router.navigate(['']);
            return false;
        }
        return true;
    }
}
