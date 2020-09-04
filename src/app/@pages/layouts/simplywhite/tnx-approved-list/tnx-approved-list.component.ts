import {Component, OnInit, ViewChild} from '@angular/core';
import {ITransaction} from '../transactions/transanction.model';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {TransactionService} from '../transactions/transaction.service';
import {LocalStorageService} from 'ngx-webstorage';

@Component({
  selector: 'app-tnx-approved-list',
  templateUrl: './tnx-approved-list.component.html',
  styleUrls: ['./tnx-approved-list.component.scss']
})
export class TnxApprovedListComponent implements OnInit {

  basicRows: ITransaction[];
  basicSort: ITransaction[];
  transactions: ITransaction[];
  columns = [{ name: 'Receiver' }, { name: 'Receiver Email' }, { name: 'Amount' }, {name: 'Currency'},
    { name: 'Status' }, {name: 'Action'}];
  @ViewChild(DatatableComponent, { static: true }) table: DatatableComponent;
  constructor(private transactionService: TransactionService, private $localStorage: LocalStorageService) {
    this.transactionService.findByOnlyStatus('approved').subscribe((res) => {
      this.transactions = res.body;

      if (this.transactions != null) {
        this.basicSort = [...this.transactions];
        // push our inital complete list
        this.basicRows = this.transactions;
      }
    }, (err) => {
    });
  }

  // No Option YET
  // https://github.com/swimlane/ngx-datatable/issues/423
  scrollBarHorizontal = window.innerWidth < 960;
  columnModeSetting = window.innerWidth < 960 ? 'standard' : 'force';


  ngOnInit() {
  }

  updateFilter(event) {
    const value = event.target.value.toLowerCase();
    // get the amount of columns in the table
    const count = this.columns.length;
    const keys = Object.keys(this.basicSort[0]);
    // filter our data
    const temp = this.basicSort.filter(item => {
      // iterate through each row's column data
      for (let i = 0; i < count; i++) {
        // check for a match
        if (
            (item[keys[i]] &&
                item[keys[i]]
                    .toString()
                    .toLowerCase()
                    .indexOf(value) !== -1) ||
            !value
        ) {
          // found match, return true to add to result set
          return true;
        }
      }
    });

    // update the rows
    this.basicRows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

}
