import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../../account/services/user-register.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {IUser} from '../../../../account/model/user.model';
import {LocalStorageService} from 'ngx-webstorage';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  // Sample Variables for the form
  txtfname;
  txtlname;
  txtusername;
  txtpassword;
  txtemail;
  user: IUser;
  constructor(public userRegisterService: UserService, private toast: ToastrService,
              private router: Router, private $localStorage: LocalStorageService) {
    this.user = $localStorage.retrieve('user');
    this.txtfname = this.user.first_name;
    this.txtlname = this.user.last_name;
    this.txtemail = this.user.email;
    this.txtusername =  this.user.username;
  }

  ngOnInit() {
  }

  register(register: any) {
    console.log(register);
    const user: IUser = {
      username: register.userName,
      password: register.password,
      email: register.email,
      first_name: register.first_name,
      last_name: register.last_name,
      id: this.user.id
    };
    this.userRegisterService.update(user, this.user.id).subscribe((res) => {
      this.$localStorage.store('user', res.body);
      this.onSaveSuccess();
    }, (error) => {
      console.log(error);
      this.onSaveError();
    });
  }
  protected onSaveSuccess(): void {
    /* this.isSaving = false;
     this.isRegistered = true;*/
    this.toast.success('Update successful');
    // this.router.navigate(['']);
  }

  protected onSaveError(): void {
    /*this.isSaving = false;*/
    this.toast.error('Update failed');
  }
}
