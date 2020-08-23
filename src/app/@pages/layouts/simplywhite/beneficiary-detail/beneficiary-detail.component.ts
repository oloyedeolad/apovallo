import { Component, OnInit } from '@angular/core';
import {LocalStorageService} from 'ngx-webstorage';
import {ActivatedRoute} from '@angular/router';
import {BeneficiaryService} from '../transactions/benefiary.service';
import {IBeneficiary} from '../transactions/beneficiary.model';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-beneficiary-detail',
  templateUrl: './beneficiary-detail.component.html',
  styleUrls: ['./beneficiary-detail.component.scss']
})
export class BeneficiaryDetailComponent implements OnInit {
  beneficiary: IBeneficiary = {};
  name = '';
  email = '';
  bank_name = '';
  phone = '';
  account = '';
  constructor(private $localStorage: LocalStorageService, private route: ActivatedRoute,
              private beneficiaryService: BeneficiaryService, private toast: ToastrService) {
    const beneficiary = this.route.snapshot.paramMap.get('id');
    this.beneficiaryService.find(Number(beneficiary)).subscribe((res) => {
      this.beneficiary = res.body;
      if (this.beneficiary != null) {
        this.name = this.beneficiary.name;
        this.email = this.beneficiary.email;
        this.bank_name = this.beneficiary.bank_name;
        this.account = this.beneficiary.account;
        this.phone = this.beneficiary.phone;
      }
    });
  }

  ngOnInit() {
  }

  createProfile(value) {
    const beneficiary: IBeneficiary = {
      name: value.name,
      email: value.email,
      account: value.account,
      bank_name: value.bank_name,
      phone: value.phone,
    };
    console.log(beneficiary);
    this.beneficiaryService.update(beneficiary, this.beneficiary.id).subscribe((res) => {
      this.beneficiary = res.body;
      this.toast.success('update successful');
    }, (err) => {
      console.log(err);
      this.toast.error('update failed');
    });
  }
}
