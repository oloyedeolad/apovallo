import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {LocalStorageService} from 'ngx-webstorage';
import {LoginService} from '../../../../account/services/login.service';
import {Router} from '@angular/router';
import {ILogin, Login} from '../../../../account/model/login.model';
import {IUser} from '../../../../account/model/user.model';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../simplywhite.component.scss']
})
export class LoginComponent implements OnInit {
  // Sample Varriables
  userName;
  password;
  constructor(private fb: FormBuilder, private $localStorage: LocalStorageService,
              private loginService: LoginService, private router: Router, private toast: ToastrService) {}

  ngOnInit() {}

  login(login: any) {
    const credentials = new Login(true, login.userName, login.password);

    this.loginService.login(credentials).subscribe(() => {
          const user: IUser = this.$localStorage.retrieve('user');
          console.log(user);
          this.router.navigate(['dashboard']);
        },
        error => {this.toast.error('Wrong username or password');

        }, () => {
          console.log('done'); });
  }
}
