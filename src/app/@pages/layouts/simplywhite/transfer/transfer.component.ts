import {Component, OnInit, ViewChild} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {TransactionService} from '../transactions/transaction.service';
import {LocalStorageService} from 'ngx-webstorage';
import {IUser} from '../../../../account/model/user.model';
import {IPaymentRequest, ITransaction} from '../transactions/transanction.model';
import {PaymentIntent, StripeCardElementOptions, StripeElementsOptions} from '@stripe/stripe-js';
import {StripeCardComponent, StripeCardNumberComponent, StripeService} from 'ngx-stripe';
import {Observable} from 'rxjs';
import {ExchangeRate, ICountry, IExchangeRate} from '../transactions/country.model';
import {ActivatedRoute} from '@angular/router';
import {error} from 'util';
import {BeneficiaryService} from '../transactions/benefiary.service';
import {IBeneficiary} from '../transactions/beneficiary.model';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';


@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent implements OnInit {
  // @ts-ignore
  @ViewChild(StripeCardNumberComponent) card: StripeCardNumberComponent;

  stripeTest: FormGroup;

  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0',
        },
      },
    },
  };

  transferForm: NgForm;
  is_ready = false;
  to_account_number: string;
  to_firstname: string;
  to_lastname: string;
  to_email: string;
  to_phone: string;
  middle = false;
  to_bank: string;
  total: number;
  amount = 0;
  rate = 0;
  is_failed = false;
  is_successful = false;
  is_goal = false;
  loadBeneficiary;
  saveBeneficiary: boolean;
  currency: string;
  source_country: ICountry;
  destination_country: ICountry;
  optionsSource: ICountry [] = [];
  optionsDestination: ICountry[] = [];
  user: IUser;
  tnx: ITransaction;
  beneficiaries: IBeneficiary[] = [];
  beneficiary: IBeneficiary = {};

  elementsOptions: StripeElementsOptions = {
    locale: 'en'
  };
  rates: IExchangeRate[];
  constructor(private toaster: ToastrService, private transactionService: TransactionService, private route: ActivatedRoute,
              private $localStorage: LocalStorageService, private stripeService: StripeService,
              private beneficiaryService: BeneficiaryService, private fb: FormBuilder) {
    this.user = this.$localStorage.retrieve('user');
    console.log(this.user);
    this.rates = $localStorage.retrieve('rates');
    this.initOptions(this.rates);
    console.log(this.rates);

    beneficiaryService.findByUserId(this.user.id).subscribe((res) => {
      this.beneficiaries = res.body;
      if (this.beneficiaries.length === 0) {
        this.toaster.info('You have no saved Beneficiary', 'No Beneficiary Saved');
      }
    }, (error4) => {
      console.log(error4);
    });
  }

  ngOnInit() {
    this.stripeTest = this.fb.group({
      name: ['Angular v10', [Validators.required]],
      amount: [1001, [Validators.required, Validators.pattern(/\d+/)]],
    });
  }
  confirmTransaction(form) {
    if (form.value.amount > 2000) {
      this.toaster.error('Your amount cannot be more than 2000');
      return;
    }
    if (form.invalid) {
      this.toaster.error('Your form is invalid, please make sure you have filled all field', 'Form is Valid');
      return;
    } else {
      this.tnx = {
        to_name: form.value.to_firstname,
        to_email: form.value.to_email,
        to_account_number: form.value.to_account_number,
        to_country: form.value.destination_country.name,
        to_bank: form.value.to_bank,
        to_phone: form.value.to_phone,
        user: this.user.username,
        // from_country: form.source_country.name,
        rate: form.value.rate,
        total: Number(form.value.rate) * Number(form.value.amount),
        amount: form.value.amount,
        currency: this.currency
      };
    }
    this.is_ready = true;
    this.middle = true;
    this.stripeTest.patchValue({
      amount: this.tnx.amount,
      name: this.user.first_name + ' ' + this.user.last_name
    });
    console.log(this.tnx);
  }

  sendTransaction() {
    const extraData: IPaymentRequest = {
      amount: this.amount * 100,
      currency: this.currency
    };

    console.log(extraData);
    this.transactionService.createIntent(extraData).subscribe((res) => {
      console.log(res);
      const client_sercret = res.body['client_secret'];
      this.stripeService.confirmCardPayment(client_sercret,
          {
                  payment_method: {
                    card: this.card.element,
                    billing_details: {
                      name: this.user.first_name + ' ' + this.user.last_name,
                      email: this.user.email
                    }
                  }
          }
          ).subscribe((result) => {
            if (result.error) {
              // console.log(result.error.message);
               this.toaster.error(result.error.message);
              this.tnx.tnx_status = result.paymentIntent.status;
              this.tnx.pay_ref = result.paymentIntent.id;
             // this.is_goal = false;
              this.is_goal = false;
              this.is_failed = true;
            } else {
              if (result.paymentIntent.status === 'succeeded') {
                console.log(result.paymentIntent);
                this.tnx.currency = result.paymentIntent.currency;
                this.tnx.tnx_status = result.paymentIntent.status;
                this.tnx.pay_ref = result.paymentIntent.id;
               // this.is_goal = false;
                this.is_goal = false;
                this.is_successful = true;
              }
            }
      }, (error1) => {
            console.log(error1);
      }, () => {
            console.log(this.tnx);
        this.transactionService.create(this.tnx).subscribe((final_result) => {
          console.log(final_result);
          this.toaster.success('Your transfer is successful, you can continue to status', 'Transaction Successful');
        }, (err) => {
          console.log(err);

        });
      });
    }, (error3) => {
      console.log(error3);
    });
  }

  changeSource(evnt: NgForm) {
    this.optionsDestination = [];
    console.log(evnt.value);
    this.source_country = evnt.value.currency;
     this.currency = evnt.value.currency.currency;
     const b = this.currency;
     const co: ICountry = this.source_country;
    console.log(evnt.controls.destination_country.reset());

    const rates1: IExchangeRate[] = this.rates.filter(function (des) {
        return des.source_country.name === co.name && des.destination_country.name !== co.name;
    });
    rates1.forEach((pes) => {
      this.optionsDestination.push(pes.destination_country);
    });
   // console.log(this.transferForm);
  }
  changeDestination(evet) {
    // tslint:disable-next-line:max-line-length
    // console.log(evet);
    this.destination_country = evet;
    if (this.destination_country == null) {
      return;
    }
    console.log(this.source_country);
    if (this.source_country == null) {
      this.toaster.error('you are yet to choose a source');
      return;
    }
    const pet = this.source_country.name;
    const prate: IExchangeRate [] = this.rates.filter((rate)  => {
       return  rate.destination_country.name === evet.name;
    });
    const finalRate: IExchangeRate [] = prate.filter((pot) => {
      return pot.source_country.name === this.source_country.name;
    });
    console.log(finalRate);
    console.log(prate);
    this.rate = finalRate[0].rate;
    console.log(this.rate);
  }

  async initOptions(rates: IExchangeRate[]) {
    await rates.forEach((exchangeRate) => {
        // this.optionsDestination.push(exchangeRate.destination_country);
        this.optionsSource.push(exchangeRate.source_country);
    });
    /*this.optionsDestination = await this.optionsDestination.filter(function (a) {
        return !this[a.name] && (this[a.name] = true);
    }, Object.create(null));*/

    this.optionsSource = await  this.optionsSource.filter(function (a) {
      return !this[a.name] && (this[a.name] = true);
    }, Object.create(null));
    console.log(this.optionsSource);
  }
  createBeneficiary(value) {
    console.log(value);
    // tslint:disable-next-line:max-line-length
    if (this.to_firstname !== null && this.to_email !== null && this.to_phone !== null && this.to_bank != null && this.to_account_number != null) {
      const beneficiary: IBeneficiary = {
        name: this.to_firstname,
        email: this.to_email,
        phone: this.to_phone,
        bank_name: this.to_bank,
        account: this.to_account_number,
        user: this.user.id
      };
      console.log(beneficiary);
      this.beneficiaryService.create(beneficiary).subscribe((res) => {
        console.log(res);
      }, (error2) => {
        console.log(error2);
      });
    } else {
    }
  }

  openMiddle(st?: boolean): boolean {
    if (st) {
      return st;
    }
    if (!this.is_goal && this.is_ready) {
      return true;
    }
    return false;
  }
  loadDataBeneficiary(value) {

  }

  fillBeneficiary(value: IBeneficiary) {
    this.to_firstname = value.name;
    this.to_account_number = value.account;
    this.to_bank = value.bank_name;
    this.to_email = value.email;
    this.to_phone = value.phone;
  }
}
