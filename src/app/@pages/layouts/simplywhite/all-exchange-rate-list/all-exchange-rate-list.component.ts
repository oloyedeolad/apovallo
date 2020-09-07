import { Component, OnInit } from '@angular/core';
import {IExchangeRate} from '../transactions/country.model';
import {ExchangeRateService} from '../transactions/exchange_rate.service';

@Component({
  selector: 'app-all-exchange-rate-list',
  templateUrl: './all-exchange-rate-list.component.html',
  styleUrls: ['./all-exchange-rate-list.component.scss']
})
export class AllExchangeRateListComponent implements OnInit {

  exchangeRates: IExchangeRate[];
  basicRows: IExchangeRate[];
  basicSort: IExchangeRate[];
  columns = [{name: 'From Country'}, {name: 'To Country'}, {name: 'Rate'}];
  constructor(private exchangeRateService: ExchangeRateService) {
    this.exchangeRateService.query().subscribe((res) => {
      this.exchangeRates = res.body;
      if (this.exchangeRates != null) {
        this.basicSort = [...this.exchangeRates];
        this.basicRows = this.exchangeRates;
      }
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
  }
}
