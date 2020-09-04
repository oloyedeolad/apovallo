import { Component, OnInit } from '@angular/core';
import {ICountry} from '../transactions/country.model';
import {BankService} from './bank.service';
import {LocalStorageService} from 'ngx-webstorage';
import {ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {IBank} from './bank.model';

@Component({
  selector: 'app-create-bank',
  templateUrl: './create-bank.component.html',
  styleUrls: ['./create-bank.component.scss']
})
export class CreateBankComponent implements OnInit {
  name;
  destination_country;
  optionsDestination: ICountry[];
  code: string;
  bank: IBank;
  constructor(private bankService: BankService, private $localStorage: LocalStorageService,
              private route: ActivatedRoute, private toast: ToastrService) {
    const bank_id = this.$localStorage.retrieve('bank_id');
    this.bankService.find(bank_id).subscribe((res) => {
      this.bank = res.body;
      if (this.bank != null) {
        this.name = this.bank.name;
        this.destination_country = this.bank.country;
        this.code = this.bank.code;
      }
    });
  }

  ngOnInit() {
  }

  createProfile(value) {
    if (this.bank.id != null) {
      this.bank.country = value.destination_country;
      this.bank.name = value.name;
      this.bank.code = value.code;
      this.bankService.update(this.bank, this.bank.id).subscribe((res) => {
        this.toast.success('update successful');
      }, (err) => {
        this.toast.error('update failed');
      });
    } else {
      const bank: IBank = {
        name: value.name,
        code: value.code,
        country: value.destination_country,
      };

      this.bankService.create(bank).subscribe((res) => {
        this.toast.success('saved success');
      }, (error) => {
        this.toast.error('Save failed');
      });
    }
  }

}
