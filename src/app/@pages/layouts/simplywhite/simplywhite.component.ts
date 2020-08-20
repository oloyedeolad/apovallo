import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RootLayout } from '../root/root.component';
import {pagesToggleService} from '../../services/toggler.service';
import {Router} from '@angular/router';
import {LocalStorageService} from 'ngx-webstorage';
import {IUser} from '../../../account/model/user.model';
import {LoginService} from '../../../account/services/login.service';
import {ExchangeRateService} from './transactions/exchange_rate.service';
import {IExchangeRate} from './transactions/country.model';

@Component({
  selector: 'simplywhite-layout',
  templateUrl: './simplywhite.component.html',
  styleUrls: ['./simplywhite.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SimplyWhiteLayout extends RootLayout implements OnInit {
  menuLinks = [
    {
      label: 'Home',
      details: '12 New Updates',
      routerLink: 'pent',
      iconType: 'fi',
      iconName: 'shield'
    },
    {
      label: 'Transactions',
      details: '234 New Emails',
      routerLink: 'transactions',
      iconType: 'fi',
      iconName: 'mail'
    },
    {
      label: 'Profile',
      routerLink: 'profile',
      iconType: 'fi',
      iconName: 'users'
    },
  ];
  user: IUser;
  constructor(public toggler: pagesToggleService, protected loginService: LoginService,  router: Router,
              private routed: Router, private $localStorage: LocalStorageService,
              private exchangeRateService: ExchangeRateService) {
   super(toggler, router);
    this.user = $localStorage.retrieve('user');
    this.loadCountries();

  }
  ngOnInit() {
    this.changeLayout('menu-pin');
    // Will sidebar close on screens below 1024
    this.autoHideMenuPin();
  }

  logOut() {
    this.loginService.logout();
    this.routed.navigate(['']);
  }

  loadCountries() {
    this.exchangeRateService.query().subscribe((res) => {
      const rates: IExchangeRate[] = res.body;
      this.$localStorage.store('rates', rates);
    });
  }
}
