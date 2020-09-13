// Angular Core
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule,  HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule} from '@angular/http';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { RouterModule } from '@angular/router';

// Routing
import { AppRoutes } from './app.routing';
import { AppComponent } from './app.component';

// Layouts
import {
    BlankComponent, RootLayout,
    SimplyWhiteLayout
} from './@pages/layouts';
// Layout Service - Required
import { pagesToggleService } from './@pages/services/toggler.service';

// Shared Layout Components
import { SidebarComponent } from './@pages/components/sidebar/sidebar.component';
import { QuickviewComponent } from './@pages/components/quickview/quickview.component';
import { QuickviewService } from './@pages/components/quickview/quickview.service';
import { SearchOverlayComponent } from './@pages/components/search-overlay/search-overlay.component';
import { HeaderComponent } from './@pages/components/header/header.component';
import { HorizontalMenuComponent } from './@pages/components/horizontal-menu/horizontal-menu.component';
import { SharedModule } from './@pages/components/shared.module';
import { pgListViewModule} from './@pages/components/list-view/list-view.module';
import { pgCardModule} from './@pages/components/card/card.module';
import { pgCardSocialModule} from './@pages/components/card-social/card-social.module';

// Basic Bootstrap Modules
import {BsDropdownModule,
        AccordionModule,
        AlertModule,
        ButtonsModule,
        CollapseModule,
        ModalModule,
        ProgressbarModule,
        TabsModule,
        TooltipModule,
        TypeaheadModule,
} from 'ngx-bootstrap';

// Pages Globaly required Components - Optional
import { pgTabsModule } from './@pages/components/tabs/tabs.module';
import { pgSwitchModule } from './@pages/components/switch/switch.module';
import { ProgressModule } from './@pages/components/progress/progress.module';

// Thirdparty Components / Plugins - Optional
import { QuillModule } from 'ngx-quill';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';


// Sample Blank Pages - Optional


import {NgxWebstorageModule} from 'ngx-webstorage';

import {ToastrModule} from 'ngx-toastr';
import {LoginComponent} from './@pages/layouts/simplywhite/login/login.component';
import {RegisterPageComponent} from './@pages/layouts/session/register/register.component';
import { ProfileComponent } from './@pages/layouts/simplywhite/profile/profile.component';
import { BasicProfileComponent } from './@pages/layouts/simplywhite/basic-profile/basic-profile.component';
import {pgSelectfx} from './@pages/components/cs-select/select.module';
import {pgSelectModule} from './@pages/components/select/select.module';
import { UserDetailComponent } from './@pages/layouts/simplywhite/user-detail/user-detail.component';
import { UserPasswordComponent } from './@pages/layouts/simplywhite/user-password/user-password.component';
import { TransactionsComponent } from './@pages/layouts/simplywhite/transactions/transactions.component';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import { PentComponent } from './@pages/layouts/simplywhite/pent/pent.component';
import { UserActivationComponent } from './@pages/layouts/simplywhite/user-activation/user-activation.component';
import {AuthInterceptor} from './interceptor/auth.interceptor';

import { SimplywhiteComponent } from './@page/layouts/simplywhite/simplywhite.component';
import { TransferComponent } from './@pages/layouts/simplywhite/transfer/transfer.component';
import {NgxStripeModule} from 'ngx-stripe';
import { TnxSuccessfulComponent } from './@pages/layouts/simplywhite/tnx-successful/tnx-successful.component';
import { TnxFailedComponent } from './@pages/layouts/simplywhite/tnx-failed/tnx-failed.component';
import { TnxPendingComponent } from './@pages/layouts/simplywhite/tnx-pending/tnx-pending.component';
import { TnxDetalsComponent } from './@pages/layouts/simplywhite/tnx-detals/tnx-detals.component';
import {AuthExpiredInterceptor} from './interceptor/auth-expired.interceptor';
import { BeneficiaryListComponent } from './@pages/layouts/simplywhite/beneficiary-list/beneficiary-list.component';
import { BeneficiaryDetailComponent } from './@pages/layouts/simplywhite/beneficiary-detail/beneficiary-detail.component';
import { PassResetComponent } from './@pages/layouts/simplywhite/pass-reset/pass-reset.component';
import { LogoutComponent } from './@pages/layouts/simplywhite/logout/logout.component';
import { HomComponent } from './@pages/layouts/simplywhite/hom/hom.component';
import {HommComponent} from './@pages/layouts/simplywhite/homm/homm.component';
import {ScrollToModule} from '@nicky-lenaers/ngx-scroll-to';
import {NgxYoutubePlayerModule} from 'ngx-youtube-player';
import {FooterComponent} from './@pages/layouts/simplywhite/footer/footer.component';
import {SwitcherComponent} from './@pages/layouts/simplywhite/switcher/switcher.component';
import {ContactComponent} from './@pages/layouts/simplywhite/contact/contact.component';
import {AboutComponent} from './@pages/layouts/simplywhite/about/about.component';
import {ScrollspyDirective} from './@pages/layouts/simplywhite/scrollspy.directive';
import {FeaturesComponent} from './@pages/layouts/simplywhite/features/features.component';
import {ServicesComponent} from './@pages/layouts/simplywhite/services/services.component';
import { CreateBankComponent } from './@pages/layouts/simplywhite/create-bank/create-bank.component';
import { BankListComponent } from './@pages/layouts/simplywhite/bank-list/bank-list.component';
import { TnxPendingListComponent } from './@pages/layouts/simplywhite/tnx-pending-list/tnx-pending-list.component';
import { TnxApprovedListComponent } from './@pages/layouts/simplywhite/tnx-approved-list/tnx-approved-list.component';
import { DeclinedListComponent } from './@pages/layouts/simplywhite/declined-list/declined-list.component';
import { AllTransactionListComponent } from './@pages/layouts/simplywhite/all-transaction-list/all-transaction-list.component';
import { AllExchangeRateListComponent } from './@pages/layouts/simplywhite/all-exchange-rate-list/all-exchange-rate-list.component';



const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

// Hammer Config Overide
// https://github.com/angular/angular/issues/10541
export class AppHammerConfig extends HammerGestureConfig  {
  overrides = <any>{
      'pinch': { enable: false },
      'rotate': { enable: false }
  };
}

@NgModule({
  declarations: [
    AppComponent,
    SimplyWhiteLayout,
    LoginComponent,
    RegisterPageComponent,
    SidebarComponent, QuickviewComponent, SearchOverlayComponent, HeaderComponent, HorizontalMenuComponent,
    BlankComponent,
    RootLayout,
    ProfileComponent,
    BasicProfileComponent,
    UserDetailComponent,
    UserPasswordComponent,
    TransactionsComponent,
    PentComponent,
    UserActivationComponent,
    SimplywhiteComponent,
    TransferComponent,
    SwitcherComponent,
    ContactComponent,
      AboutComponent,
    FooterComponent,
    TnxSuccessfulComponent,
    TnxFailedComponent,
    TnxPendingComponent,
    TnxDetalsComponent,
    BeneficiaryListComponent,
    BeneficiaryDetailComponent,
    PassResetComponent,
    LogoutComponent,
    HomComponent,
    HommComponent,
      ScrollspyDirective,
      FeaturesComponent,
    ServicesComponent,
    CreateBankComponent,
    BankListComponent,
    TnxPendingListComponent,
    TnxApprovedListComponent,
    DeclinedListComponent,
    AllTransactionListComponent,
    AllExchangeRateListComponent
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        FormsModule,
        HttpModule,
        HttpClientModule,
        SharedModule,
        // tslint:disable-next-line:max-line-length
        NgxStripeModule.forRoot('pk_live_51HHXOtA7YrVgiB6zUCsJGi4tw5h3MFXQ5WnpIy0Ceb3usZMzYLNxh40xgLwhftm9oNcmTcE1QC0TXf6YjFxI9Ute00bbqYEWpi'),
        ProgressModule,
        pgListViewModule,
        pgCardModule,
        pgCardSocialModule,
        RouterModule.forRoot(AppRoutes),
        BsDropdownModule.forRoot(),
        AccordionModule.forRoot(),
        AlertModule.forRoot(),
        ButtonsModule.forRoot(),
        CollapseModule.forRoot(),
        ModalModule.forRoot(),
        ToastrModule.forRoot(),
        ProgressbarModule.forRoot(),
        TabsModule.forRoot(),
        TooltipModule.forRoot(),
        TypeaheadModule.forRoot(),
        NgxWebstorageModule.forRoot(),
        pgTabsModule,
        PerfectScrollbarModule,
        ScrollToModule.forRoot(),
        NgxYoutubePlayerModule.forRoot(),
        pgSwitchModule,
        QuillModule.forRoot(),
        ReactiveFormsModule,
        pgSelectfx,
        pgSelectModule,
        NgxDatatableModule,
    ],
  providers: [QuickviewService, pagesToggleService, {
    provide: PERFECT_SCROLLBAR_CONFIG,
    useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
  },
  {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
  },
      {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthExpiredInterceptor,
          multi: true
      },
  {
    provide: HAMMER_GESTURE_CONFIG,
    useClass: AppHammerConfig
  }],
  bootstrap: [AppComponent],
})
export class AppModule { }
