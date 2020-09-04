import {Component, OnInit, ViewChild} from '@angular/core';
import {IBank, IReadBank} from '../create-bank/bank.model';
import {LocalStorageService} from 'ngx-webstorage';
import {BankService} from '../create-bank/bank.service';
import {DatatableComponent} from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-bank-list',
  templateUrl: './bank-list.component.html',
  styleUrls: ['./bank-list.component.scss']
})
export class BankListComponent implements OnInit {

  basicRows: IReadBank[];
  basicSort: IReadBank[];
  banks: IReadBank[];
  columns = [ { name: 'Name' }, { name: 'Country' }, { name: 'Code' }];
  @ViewChild(DatatableComponent, { static: true }) table: DatatableComponent;
  constructor(private $localStorage: LocalStorageService, private bankService: BankService) {
    this.bankService.query().subscribe((res) => {
      this.banks = res.body;
      if (this.banks != null) {
        this.basicSort = [...this.banks];
        this.basicRows = this.banks;
      }
    }, (res) => {});

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
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.basicRows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

}
