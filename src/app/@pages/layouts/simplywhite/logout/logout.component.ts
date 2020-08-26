import { Component, OnInit } from '@angular/core';
import {LocalStorageService} from 'ngx-webstorage';
import {LoginService} from '../../../../account/services/login.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private  login: LoginService) {
    this.login.logout();
  }

  ngOnInit() {
  }

}
