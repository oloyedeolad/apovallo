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
    path: 'casual',
    data: {
        breadcrumb: 'Home'
    },
    component: CasualLayout
  },
  {
    path: 'executive',
    data: {
        breadcrumb: 'Home'
    },
    component: ExecutiveLayout
  },
  {
    path: 'simplywhite',
    data: {
        breadcrumb: 'Home'
    },
    component: SimplyWhiteLayout,
    children: [
      {path: 'profile', component: ProfileComponent}
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
