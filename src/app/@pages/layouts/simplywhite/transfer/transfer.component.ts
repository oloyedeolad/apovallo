import {Component, OnInit, ViewChild} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {TransactionService} from '../transactions/transaction.service';
import {LocalStorageService} from 'ngx-webstorage';
import {IUser} from '../../../../account/model/user.model';
import {IPaymentRequest, ITransaction} from '../transactions/transanction.model';
import {PaymentIntent, StripeCardElementOptions, StripeElementsOptions} from '@stripe/stripe-js';
import {StripeCardComponent, StripeService} from 'ngx-stripe';
import {Observable} from 'rxjs';


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
  source_country: string;
  destination_country: string;
  optionsSource: string[];
  optionsDestination: string[];
  user: IUser;
  tnx: ITransaction;

  elementsOptions: StripeElementsOptions = {
    locale: 'en'
  };

  constructor(private toaster: ToastrService, private transactionService: TransactionService,
              private $localStorage: LocalStorageService, private stripeService: StripeService) {
    this.user = this.$localStorage.retrieve('user');
  }

  ngOnInit() {
  }

  sendTransaction(form: any) {

    const extraData: IPaymentRequest = {
      amount: this.amount,
      currency: this.currency
    };

    console.log(extraData);
    this.transactionService.createIntent(extraData).subscribe((res) => {
      console.log(res);
    });
  }

}
