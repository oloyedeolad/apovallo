import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../../account/services/user-register.service';
import {IUser} from '../../../../account/model/user.model';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './register.component.html',
  styleUrls: ['../../simplywhite/simplywhite.component.scss']
})
export class RegisterPageComponent implements OnInit {
  // Sample Variables for the form
  txtfname;
  txtlname;
  txtusername;
  txtpassword;
  txtemail;
  txtphone;
  is_successful = false;
  agreed = false;

  constructor(public userRegisterService: UserService, private toast: ToastrService,
              private router: Router) {}

  ngOnInit() {}

  register(register: any) {
    console.log(this.agreed);
    if (!this.agreed) {
      this.toast.error('please make sure the form is filled correctly');
      return;
    }
    const user: IUser = {
      username: register.value.txtusername.toLocaleLowerCase(),
      password: register.value.txtpassword,
      email: register.value.txtemail,
      first_name: register.value.txtfname,
      last_name: register.value.txtlname,
      phone: register.value.txtphone
    };
    console.log(user);
    this.userRegisterService.create(user).subscribe((res) => {
      this.onSaveSuccess();
    }, (error) => {
      console.log(error);
      this.onSaveError();
    });
  }

  protected onSaveSuccess(): void {
   /* this.isSaving = false;
    this.isRegistered = true;*/
    this.is_successful = true;
    this.toast.success('Registration successful, please check your email to activate');
    // this.router.navigate(['']);
  }

  protected onSaveError(): void {
    /*this.isSaving = false;*/
    this.toast.error('Registration failed, ensure you have not registered before');
  }
}
