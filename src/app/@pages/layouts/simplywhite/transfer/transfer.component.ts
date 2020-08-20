import {Component, OnInit, ViewChild} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {TransactionService} from '../transactions/transaction.service';
import {LocalStorageService} from 'ngx-webstorage';
import {IUser} from '../../../../account/model/user.model';
import {IPaymentRequest, ITransaction} from '../transactions/transanction.model';
import {PaymentIntent, StripeCardElementOptions, StripeElementsOptions} from '@stripe/stripe-js';
import {StripeCardComponent, StripeService} from 'ngx-stripe';
import {Observable} from 'rxjs';
import {ICountry, IExchangeRate} from '../transactions/country.model';


@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent implements OnInit {
  // @ts-ignore
  @ViewChild(StripeCardComponent) card: StripeCardComponent;

  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0'
        }
      }
    }
  };

  to_account_number: string;
  to_firstname: string;
  to_lastname: string;
  to_email: string;
  to_phone: string;
  to_bank: string;
  total: number;
  amount: number;
  rate: number;
  currency: string;
  source_country: ICountry;
  destination_country: ICountry;
  optionsSource: ICountry [] = [];
  optionsDestination: ICountry[] = [];
  user: IUser;
  tnx: ITransaction;

  elementsOptions: StripeElementsOptions = {
    locale: 'en'
  };
  rates: IExchangeRate[];
  constructor(private toaster: ToastrService, private transactionService: TransactionService,
              private $localStorage: LocalStorageService, private stripeService: StripeService) {
    this.user = this.$localStorage.retrieve('user');
    console.log(this.user);
    this.rates = $localStorage.retrieve('rates');
    this.rates.forEach((exchangeRate) => {
      this.optionsSource.push(exchangeRate.source_country);
      this.optionsDestination.push(exchangeRate.destination_country);
    });
  }

  ngOnInit() {
  }

  sendTransaction(form: any) {
    this.tnx = {
      to_name: form.to_firstname + ' ' + form.to_lastname,
      to_email: form.to_email,
      to_account_number: form.to_account_number,
      to_country: form.destination_country.name,
      to_bank: form.to_bank,
      to_phone: form.to_phone,
      user: this.user.username,
      from_country: form.source_country.name,
      rate: form.rate,
      total: form.total,
      amount: form.amount
    };
    const extraData: IPaymentRequest = {
      amount: this.amount,
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
              console.log(result.error.message);
              this.tnx.tnx_status = result.paymentIntent.status;
              this.tnx.pay_ref = result.paymentIntent.id;
            } else {
              if (result.paymentIntent.status === 'succeeded') {
                console.log(result.paymentIntent.status);
                this.tnx.tnx_status = result.paymentIntent.status;
                this.tnx.pay_ref = result.paymentIntent.id;
              }
            }
      }, (error1) => {
            console.log(error1);
      }, () => {
            console.log(this.tnx);
        this.transactionService.create(this.tnx).subscribe((final_result) => {
          console.log(final_result);
          this.toaster.success('Your transfer is successful, you can continue to status', 'Transaction Successfule');
        }, (err) => {
          console.log(err);
        });
      });
    }, (error) => {
      console.log(error);
    });
  }

  changeSource(evnt) {
    console.log('am here now');
    this.source_country = evnt;
    this.currency = evnt.currency;
    console.log(this.currency);
  }
  changeDestination(evet) {
    // tslint:disable-next-line:max-line-length
    // console.log(evet);
    console.log(this.rates);
    const pet = this.source_country.name;
    const prate: IExchangeRate [] = this.rates.filter((rate)  => {
       return  rate.destination_country.name === evet.name;
    });
    const finalRate: IExchangeRate [] = prate.filter((pot) => {
      return pot.source_country.name === this.source_country.name;
    });
    console.log(finalRate);
    this.rate = finalRate[0].rate;
    console.log(this.rate);
  }
}
