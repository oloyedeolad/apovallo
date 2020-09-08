import { Component, OnInit } from '@angular/core';
import {LocalStorageService} from 'ngx-webstorage';
import {ActivatedRoute} from '@angular/router';
import {BeneficiaryService} from '../transactions/benefiary.service';
import {IBeneficiary, IReadBeneficiary} from '../transactions/beneficiary.model';
import {ToastrService} from 'ngx-toastr';
import {BankService} from '../create-bank/bank.service';
import {IBank, IReadBank} from '../create-bank/bank.model';

@Component({
  selector: 'app-beneficiary-detail',
  templateUrl: './beneficiary-detail.component.html',
  styleUrls: ['./beneficiary-detail.component.scss']
})
export class BeneficiaryDetailComponent implements OnInit {
  beneficiary: IReadBeneficiary = {};
  name = '';
  email = '';
  bank = '';
  phone = '';
  account = '';
  bankOptions: IReadBank[];
  constructor(private $localStorage: LocalStorageService, private route: ActivatedRoute,
              private beneficiaryService: BeneficiaryService, private toast: ToastrService,
              private bankService: BankService) {
    const beneficiary = this.route.snapshot.paramMap.get('id');
    this.beneficiaryService.find(Number(beneficiary)).subscribe((res) => {
      this.beneficiary = res.body;
      if (this.beneficiary != null) {
        this.name = this.beneficiary.name;
        this.email = this.beneficiary.email;
        this.bank = this.beneficiary.bank.name;
        this.account = this.beneficiary.account;
        this.phone = this.beneficiary.phone;
      }
    });

    this.bankService.query().subscribe((res) => {
      console.log(res);
      this.bankOptions = res.body;
    }, (err) => {
      console.log(err);
    }) ;
  }

  ngOnInit() {
  }

  createProfile(value) {
    const beneficiary: IBeneficiary = {
      name: value.name,
      email: value.email,
      account: value.account,
      bank: value.bank.id,
      phone: value.phone,
    };
    console.log(beneficiary);
    this.beneficiaryService.update(beneficiary, this.beneficiary.id).subscribe((res) => {
      // this.beneficiary = res.body;
      this.toast.success('update successful');
    }, (err) => {
      console.log(err);
      this.toast.error('update failed');
    });
  }
}
