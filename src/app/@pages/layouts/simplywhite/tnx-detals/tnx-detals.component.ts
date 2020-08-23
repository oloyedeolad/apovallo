import { Component, OnInit } from '@angular/core';
import {TransactionService} from '../transactions/transaction.service';
import {LocalStorageService} from 'ngx-webstorage';
import {ActivatedRoute} from '@angular/router';
import {ITransaction} from '../transactions/transanction.model';

@Component({
  selector: 'app-tnx-detals',
  templateUrl: './tnx-detals.component.html',
  styleUrls: ['./tnx-detals.component.scss']
})
export class TnxDetalsComponent implements OnInit {

  transaction: ITransaction = {};
  constructor(private transactionService: TransactionService, private $localStorage: LocalStorageService,
              private route: ActivatedRoute) {
    const transfer_tnx = this.route.snapshot.paramMap.get('id');
    console.log(transfer_tnx);
    this.transactionService.find(Number(transfer_tnx)).subscribe((res) => {
        this.transaction  = res.body;
        console.log(this.transaction);
    }, (error) => {
      console.log(error);
    });
  }

  ngOnInit() {
  }

}
