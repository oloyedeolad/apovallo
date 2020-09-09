import { Component, OnInit } from '@angular/core';
import {ICountry, IExchangeRate} from '../transactions/country.model';
import {ExchangeRateService} from '../transactions/exchange_rate.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-all-exchange-rate-list',
  templateUrl: './all-exchange-rate-list.component.html',
  styleUrls: ['../simplywhite.component.scss']
})
export class AllExchangeRateListComponent implements OnInit {
  constructor(private exchangeRateService: ExchangeRateService) {
    this.exchangeRateService.query().subscribe((res) => {
      this.exchangeRates = res.body;
      this.rates = this.exchangeRates;
      if (this.exchangeRates != null) {
        this.basicSort = [...this.exchangeRates];
        this.basicRows = this.exchangeRates;
      }
    }, () => {},
        () => {
          this.initOptions(this.rates);
        });
  }
  rates: IExchangeRate [];
  rate = 0;
  amount = 0;
  total = 0;
  exchangeRates: IExchangeRate[];
  basicRows: IExchangeRate[];
  basicSort: IExchangeRate[];
  currency: string;
  source_country: ICountry = {};
  source_country1: ICountry = {currency_label: 'Source'};
  destination_country: ICountry = {};
  destination_country1: ICountry = {currency_label: 'Destination'};
  optionsSource: ICountry [] = [];
  optionsDestination: ICountry[] = [];
  columns = [{name: 'From Country'}, {name: 'To Country'}, {name: 'Rate'}];
  // No Option YET
  // https://github.com/swimlane/ngx-datatable/issues/423
  scrollBarHorizontal = window.innerWidth < 960;
  columnModeSetting = window.innerWidth < 960 ? 'standard' : 'force';


  async initOptions(rates: IExchangeRate[]) {
    await rates.forEach((exchangeRate) => {
      // this.optionsDestination.push(exchangeRate.destination_country);
      this.optionsSource.push(exchangeRate.source_country);
    });
    /*this.optionsDestination = await this.optionsDestination.filter(function (a) {
        return !this[a.name] && (this[a.name] = true);
    }, Object.create(null));*/

    this.optionsSource = await  this.optionsSource.filter(function (a) {
      return !this[a.name] && (this[a.name] = true);
    }, Object.create(null));
    console.log(this.optionsSource);
    this.source_country = this.optionsSource[0];
    this.filterDestination();
    this.destination_country = this.optionsDestination[0];
    this.fixRate();
  }

  changeSource(evnt: NgForm) {
    this.optionsDestination = [];
    this.source_country = evnt.value.currency;
    // console.log(this.source_country);
    this.currency = evnt.value.currency.currency;
    const b = this.currency;
    this.filterDestination();
    this.fixRate();
  }

  filterDestination() {
    const co: ICountry = this.source_country;
    const rates1: IExchangeRate[] = this.rates.filter(function (des) {
      return des.source_country.name === co.name && des.destination_country.name !== co.name;
    });
    rates1.forEach((pes) => {
      this.optionsDestination.push(pes.destination_country);
    });
    console.log(this.optionsDestination);
  }


  changeDestination(evet) {
    // tslint:disable-next-line:max-line-length
    // console.log(evet);
    this.destination_country = evet;
    if (this.destination_country == null) {
      return;
    }
    console.log(this.source_country);
    if (this.source_country == null) {
      // this.toaster.error('you are yet to choose a source');
      return;
    }
    const pet = this.source_country.name;
    this.fixRate();
  }

  fixRate() {
    const prate: IExchangeRate [] = this.rates.filter((rate)  => {
      return  rate.destination_country.name === this.destination_country.name;
    });
    const finalRate: IExchangeRate [] = prate.filter((pot) => {
      return pot.source_country.name === this.source_country.name;
    });
    console.log(finalRate);
    console.log(prate);
    this.rate = finalRate[0].rate;
    console.log(this.rate);
    this.total = this.rate * this.amount;
  }
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
