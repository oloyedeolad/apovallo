import { Routes } from '@angular/router';
// Layouts
import {
  CondensedComponent,
  BlankComponent,
  CorporateLayout,
  SimplyWhiteLayout,
  ExecutiveLayout,
  CasualLayout ,
  BlankCasualComponent,
  BlankCorporateComponent,
  BlankSimplywhiteComponent
} from './@pages/layouts';
import {LoginComponent} from './@pages/layouts/simplywhite/login/login.component';
import {RegisterPageComponent} from './@pages/layouts/session/register/register.component';
import {ProfileComponent} from './@pages/layouts/simplywhite/profile/profile.component';
import {TransactionsComponent} from './@pages/layouts/simplywhite/transactions/transactions.component';
import {PentComponent} from './@pages/layouts/simplywhite/pent/pent.component';
import {UserActivationComponent} from './@pages/layouts/simplywhite/user-activation/user-activation.component';





export const AppRoutes: Routes = [

  {
    path: '',
    data: {
        breadcrumb: 'Home'
    },
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterPageComponent
  },
  {
    path: 'account/activate/:activation_key/:user',
    component: UserActivationComponent
  },
  {
    path: 'dashboard',
    data: {
        breadcrumb: 'Home'
    },
    component: SimplyWhiteLayout,
    children: [
      {path: 'profile', component: ProfileComponent},
      {path: 'transactions', component: TransactionsComponent},
      {path: '', component: PentComponent},
      {path: 'pent', component: PentComponent}
    ]
  },
  {
    path: 'corporate',
    data: {
        breadcrumb: 'Home'
    },
    component: CorporateLayout
  },
];
