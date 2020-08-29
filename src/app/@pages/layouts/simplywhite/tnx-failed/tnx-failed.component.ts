import {Component, OnInit, ViewChild} from '@angular/core';
import {ITransaction} from '../transactions/transanction.model';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {IUser} from '../../../../account/model/user.model';
import {TransactionService} from '../transactions/transaction.service';
import {LocalStorageService} from 'ngx-webstorage';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-tnx-failed',
  templateUrl: './tnx-failed.component.html',
  styleUrls: ['./tnx-failed.component.scss']
})
export class TnxFailedComponent implements OnInit {
  basicRows: ITransaction[];
  basicSort: ITransaction[];
  columns = [{ name: 'Receiver' }, { name: 'Receiver Email' }, { name: 'Amount' },
    { name: 'Status' }, {name: 'Action'}];
  pageSize = 20;
  @ViewChild(DatatableComponent, { static: true }) table: DatatableComponent;
  user: IUser;
  transactions: ITransaction[];
  constructor(private transactionService: TransactionService, private $localStorage: LocalStorageService,
              private route: ActivatedRoute) {
    console.log(this.columnModeSetting);
    this.user = $localStorage.retrieve('user');
      this.transactions = this.$localStorage.retrieve('fTnx');
      if (this.transactions != null) {
        this.basicSort = [...this.transactions];
        // push our inital complete list
        this.basicRows = this.transactions;
      }
    window.onresize = () => {
      this.scrollBarHorizontal = window.innerWidth < 960;
      this.columnModeSetting = window.innerWidth < 960 ? 'standard' : 'force';
    };
  }
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
