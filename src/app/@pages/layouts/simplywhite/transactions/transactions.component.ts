import {Component, OnInit, ViewChild} from '@angular/core';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {TransactionService} from './transaction.service';
import {LocalStorageService} from 'ngx-webstorage';
import {IUser} from '../../../../account/model/user.model';
import {ITransaction} from './transanction.model';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

  basicRows: ITransaction[];
  basicSort: ITransaction[];
  columns = [{ name: 'Receiver' }, { name: 'Receiver Email' }, { name: 'Amount' }, {name: 'Currency'},
    { name: 'Status' }, {name: 'Action'}];
  @ViewChild(DatatableComponent, { static: true }) table: DatatableComponent;
  user: IUser;
  transactions: ITransaction[];
  nFailed = 0;
  nFailedSum = 0;
  nPendingSum = 0;
  npending = 0;
  nSuccessful = 0;
  nSuccessfulSum = 0;
  lastSuccesful: ITransaction = {};
  lastPending: ITransaction = {};
  lastFailed: ITransaction = {};
  transactionsPending: ITransaction[];
  transactionSuccessful: ITransaction[];

  constructor(private transactionService: TransactionService, private $localStorage: LocalStorageService,
              private route: ActivatedRoute) {
    console.log(this.columnModeSetting);
    this.user = $localStorage.retrieve('user');

        this.transactions = this.$localStorage.retrieve('aTnx');
        if (this.transactions != null) {
          this.basicSort = [...this.transactions];
          // push our inital complete list
          this.basicRows = this.transactions;
        }
        /*this.lastFailed = this.$localStorage.retrieve('lastFailed');*/
        this.nFailed = this.$localStorage.retrieve('nFailed');
        this.nFailedSum = this.$localStorage.retrieve('nFailedSum');
      /*  this.npending = this.$localStorage.retrieve('npending');
        this.nPendingSum = this.$localStorage.retrieve('mPendingSum');*/

    this.transactionService.findByStatus('pending', this.user.username).subscribe((res) => {
      this.transactionsPending = res.body;
      if (this.transactions != null) {
        this.basicSort = [...this.transactions];
        // push our inital complete list
        this.basicRows = this.transactions;
      }
      console.log(this.transactions);
    }, (error) => {
      console.log(error);
    }, () => {
      this.nPendingSum = this.transactionsPending.reduce((a, b) => a + (b.amount || 0), 0);
      this.npending = this.transactionsPending.length;
    });
      /*  this.nSuccessful = this.$localStorage.retrieve('nSuccessful');
        this.nSuccessfulSum = this.$localStorage.retrieve('nSuccessfulSum');
*/
    this.transactionService.findByStatus('completed', this.user.username).subscribe((res) => {
      this.transactionSuccessful = res.body;
      console.log('All: ' + this.transactionSuccessful);
      // this.$localStorage.store('aTnx', this.transactions);

      if (this.transactions != null) {
        this.basicSort = [...this.transactions];
        // push our inital complete list
        this.basicRows = this.transactions;
      }
    }, (error) => {
      console.log(error);
    }, () => {
      this.nSuccessful = this.transactionSuccessful.length;
      this.lastSuccesful = this.transactionSuccessful[this.nFailed - 1];
      this.nSuccessfulSum = this.transactionSuccessful.reduce((a, b) => a + (b.amount || 0), 0);
    });
    window.onresize = () => {
      this.scrollBarHorizontal = window.innerWidth < 960;
      this.columnModeSetting = window.innerWidth < 960 ? 'standard' : 'force';
    };
  }

  // No Option YET
  // https://github.com/swimlane/ngx-datatable/issues/423
  scrollBarHorizontal = window.innerWidth < 960;
  columnModeSetting = window.innerWidth < 960 ? 'standard' : 'force';

  ngOnInit() {
  }


  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.basicSort.filter(function(d) {
      // Change the column name here
      // example d.places
      return d.to_name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.basicRows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }
}
