import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../../account/services/user-register.service';
import {ToastrService} from 'ngx-toastr';
import {ILogin, Login} from '../../../../account/model/login.model';
import {LocalStorageService} from 'ngx-webstorage';
import {IUser} from '../../../../account/model/user.model';

@Component({
  selector: 'app-user-password',
  templateUrl: './user-password.component.html',
  styleUrls: ['./user-password.component.scss']
})
export class UserPasswordComponent implements OnInit {

  oldpassword: string;
  comfirmPassword: string;
  confirmTxtpassword: string;
  txtpassword: string;
  user: IUser;
  constructor(public userRegisterService: UserService, private toast: ToastrService, private $localStorage: LocalStorageService) {
    this.user = $localStorage.retrieve('user');
  }

  ngOnInit() {
  }

  changePassword(formP: any) {
    const login: ILogin = {
      password: formP.txtpassword,
      oldPassword: formP.oldpassword,
      username: this.user.username
    };

    console.log(login);
    this.userRegisterService.updatePassword(login).subscribe((res) => {
      this.toast.success('Your update was successful', 'Successful');
    }, () => {
      this.toast.error('Your update failed');
    });
  }

}
