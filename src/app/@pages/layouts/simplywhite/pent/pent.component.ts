import { Component, OnInit } from '@angular/core';
import {TransactionService} from '../transactions/transaction.service';
import {LocalStorageService} from 'ngx-webstorage';
import {ActivatedRoute} from '@angular/router';
import {ITransaction} from '../transactions/transanction.model';
import {IUser} from '../../../../account/model/user.model';

@Component({
  selector: 'app-pent',
  templateUrl: './pent.component.html',
  styleUrls: ['./pent.component.scss']
})
export class PentComponent implements OnInit {

  basicRows: ITransaction[];
  basicSort: ITransaction[];
  user: IUser;
  transactions: ITransaction[] = [];
  pendingTransactions: ITransaction[] = [];
  succesfulTransactions: ITransaction[] = [];
  failedTransactions: ITransaction[] = [];
  nFailed = 0;
  nFailedSum = 0;
  nPendingSum = 0;
  npending = 0;
  nSuccessful = 0;
  nSuccessfulSum = 0;
  lastSuccesful: ITransaction = {};
  lastPending: ITransaction = {};
  lastFailed: ITransaction = {};
  nLastTransaction;
  constructor(private transactionService: TransactionService, private $localStorage: LocalStorageService,
              private route: ActivatedRoute) {
    this.loadData();
    this.loadAnother();
  }

  ngOnInit() {
  }

  async loadData() {
    this.user = this.$localStorage.retrieve('user');

    await this.transactionService.findByStatus('successful', this.user.username).subscribe((res) => {
      this.succesfulTransactions = res.body;
      this.$localStorage.store('sTnx', this.succesfulTransactions);
      console.log(this.transactions);
      // this.basicSort = [...this.transactions];
      // push our inital complete list
      // this.basicRows = this.transactions;
      if (this.succesfulTransactions.length != null) {
        this.nSuccessful = this.succesfulTransactions.length;
        this.lastSuccesful = this.succesfulTransactions[this.nFailed - 1];
        this.nSuccessfulSum = this.succesfulTransactions.reduce((a, b) => a + (b.amount || 0), 0);
        this.$localStorage.store('nSuccessful', this.nSuccessful);
        this.$localStorage.store('lastSuccessful', this.lastSuccesful);
        this.$localStorage.store('nSuccessfulSum', this.nSuccessfulSum);
      }
    }, (error) => {
      console.log(error);
    });

    await this.transactionService.findByStatus('pending', this.user.username).subscribe((res) => {
      this.pendingTransactions = res.body;
      this.$localStorage.store('pTnx', this.pendingTransactions);
      // this.basicSort = [...this.transactions];
      // push our inital complete list
      // this.basicRows = this.transactions;
      if (this.pendingTransactions != null) {
        this.npending = this.pendingTransactions.length;
        this.lastPending = this.pendingTransactions[this.npending - 1];
        this.nPendingSum = this.pendingTransactions.reduce((a, b) => a + (b.amount || 0), 0);
        this.$localStorage.store('npending', this.npending);
        this.$localStorage.store('lastPending', this.lastPending);
        this.$localStorage.store('mPendingSum', this.nPendingSum);
      }
      console.log(this.transactions);
    }, (error) => {
      console.log(error);
    });

    await this.transactionService.findByStatus('failed', this.user.username).subscribe((res) => {
      this.failedTransactions = res.body;
      this.$localStorage.store('fTnx', this.failedTransactions);
      // this.basicSort = [...this.transactions];
      // push our inital complete list
      // this.basicRows = this.transactions;
      if (this.failedTransactions != null) {
        this.nFailed = this.failedTransactions.length;
        this.lastFailed = this.failedTransactions[this.nFailed - 1 ];
        this.nFailedSum = this.pendingTransactions.reduce((a, b) => a + (b.amount || 0), 0);
        this.$localStorage.store('nFailed', this.nFailed);
        this.$localStorage.store('lastFailed', this.lastFailed);
        this.$localStorage.store('nFailedSum', this.nFailedSum);
      }
      console.log(this.transactions);
    }, (error) => {
      console.log(error);
    });
  }

  async loadAnother() {
    const user: IUser = this.$localStorage.retrieve('user');
    console.log(user);
    await this.transactionService.findByUserId(user.username).subscribe((res) => {
      this.transactions = res.body;
      console.log(this.transactions);
      this.$localStorage.store('aTnx', this.transactions);

     /* if (this.succesfulTransactions != null) {
        this.nSuccessful = this.succesfulTransactions.length;
        this.nSuccessfulSum = this.succesfulTransactions.reduce((a, b) => a + (b.amount || 0), 0);
      }*/
    }, (error) => {
      console.log(error);
    });
  }
}
