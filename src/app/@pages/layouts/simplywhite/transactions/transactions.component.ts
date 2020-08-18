import {Component, OnInit, ViewChild} from '@angular/core';
import {DatatableComponent} from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

  basicRows = [];
  basicSort = [];
  columns = [{ name: 'Title' }, { name: 'Places' }, { name: 'Activities' }, { name: 'Status' }, { name: 'Last Update' }];
  @ViewChild(DatatableComponent, { static: true }) table: DatatableComponent;
  constructor() {
    console.log(this.columnModeSetting);
  }

  // No Option YET
  // https://github.com/swimlane/ngx-datatable/issues/423
  scrollBarHorizontal = window.innerWidth < 960;
  columnModeSetting = window.innerWidth < 960 ? 'standard' : 'force';

  ngOnInit() {
  }

}
