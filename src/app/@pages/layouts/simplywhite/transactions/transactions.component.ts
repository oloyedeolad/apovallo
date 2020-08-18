import {Component, OnInit, ViewChild} from '@angular/core';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {TransactionService} from './transaction.service';
import {LocalStorageService} from 'ngx-webstorage';
import {IUser} from '../../../../account/model/user.model';
import {ITransaction} from './transanction.model';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

  basicRows: ITransaction[];
  basicSort: ITransaction[];
  columns = [{name: 'ID'}, { name: 'Receiver' }, { name: 'Receiver Email' }, { name: 'Amount' },
    { name: 'Status' }, {name: 'Action'}];
  @ViewChild(DatatableComponent, { static: true }) table: DatatableComponent;
  user: IUser;
  transactions: ITransaction[];


  constructor(private transactionService: TransactionService, private $localStorage: LocalStorageService) {
    console.log(this.columnModeSetting);
    this.user = $localStorage.retrieve('user');
    transactionService.query(this.user.id).subscribe((res) => {
      this.transactions = res.body;
      this.basicSort = [...this.transactions];

      // push our inital complete list
      this.basicRows = this.transactions;
    }, (error) => {
      console.log(error);
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
