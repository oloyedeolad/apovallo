import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {LocalStorageService} from 'ngx-webstorage';
import {LoginService} from '../../../../account/services/login.service';
import {Router} from '@angular/router';
import {ILogin, Login} from '../../../../account/model/login.model';
import {IUser} from '../../../../account/model/user.model';
import {ToastrService} from 'ngx-toastr';
import {SERVER_API_URL} from '../../../../app.constant';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../simplywhite.component.scss']
})
export class LoginComponent implements OnInit {
  // Sample Varriables
  userName;
  password;
  is_reset = false;
  email;
  constructor(private fb: FormBuilder, private $localStorage: LocalStorageService,
              private loginService: LoginService, private router: Router, private toast: ToastrService) {}

  ngOnInit() {}

  login(login: any) {
    const credentials = new Login(true, login.userName.toLocaleLowerCase(), login.password);

    this.loginService.login(credentials).subscribe(() => {
          const user: IUser = this.$localStorage.retrieve('user');
          console.log(user);
          this.router.navigate(['dashboard']);
        },
        error => {this.toast.error('Wrong username or password');

        }, () => {
          console.log('done'); });
  }

    requestPassword(req: any) {
      this.loginService.resetPassword(req).subscribe((res) => {
          this.toast.success('Please check your email for a link to reset your password');
      }, (err) => {
          console.log(err);
      }, () => {
          this.is_reset = false;
      });
  }
}
