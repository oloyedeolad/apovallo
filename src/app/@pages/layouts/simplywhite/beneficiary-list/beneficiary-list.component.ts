import {Component, OnInit, ViewChild} from '@angular/core';
import {ITransaction} from '../transactions/transanction.model';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {IUser} from '../../../../account/model/user.model';
import {LocalStorageService} from 'ngx-webstorage';
import {BeneficiaryService} from '../transactions/benefiary.service';
import {IBeneficiary} from '../transactions/beneficiary.model';

@Component({
  selector: 'app-beneficiary-list',
  templateUrl: './beneficiary-list.component.html',
  styleUrls: ['./beneficiary-list.component.scss']
})
export class BeneficiaryListComponent implements OnInit {

  basicRows: IBeneficiary[];
  basicSort: IBeneficiary[];
  columns = [{name: 'ID'}, { name: 'Name' }, { name: 'Bank Name' }, { name: 'Account' },
    { name: 'Email' }, {name: 'Phone'}];
  @ViewChild(DatatableComponent, { static: true }) table: DatatableComponent;
  user: IUser;
  transactions: ITransaction[];
  beneficiaries: IBeneficiary[] = [];

  constructor(private $localStorage: LocalStorageService, private beneficiaryService: BeneficiaryService) {
    this.user = this.$localStorage.retrieve('user');
    this.beneficiaryService.findByUserId(this.user.id).subscribe((res) => {
      this.beneficiaries = res.body;
      if (this.beneficiaries != null) {
        this.basicSort = [...this.beneficiaries];
        // push our inital complete list
        this.basicRows = this.beneficiaries;
      }
    });

    window.onresize = () => {
      this.scrollBarHorizontal = window.innerWidth < 960;
      this.columnModeSetting = window.innerWidth < 960 ? 'standard' : 'force';
    };
  }
  // No Option YET
  // https://github.com/swimlane/ngx-datatable/issues/423
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
