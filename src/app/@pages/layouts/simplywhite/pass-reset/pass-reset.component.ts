import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {LoginService} from '../../../../account/services/login.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-pass-reset',
  templateUrl: './pass-reset.component.html',
  styleUrls: ['./pass-reset.component.scss']
})
export class PassResetComponent implements OnInit {

  newPass;
  password;
  token: UserReset = {};
  tokens: string;
  constructor(private route: ActivatedRoute, private loginService: LoginService,
              private toast: ToastrService) {
    this.tokens = this.route.snapshot.paramMap.get('token');
    console.log(this.tokens);
  }

  ngOnInit() {
  }

  resetPassword(req: any) {
    if (req.newPass !== req.password) {
      this.toast.error('Both password are different');
      return;
    }
    console.log(req);
    this.token.token = this.tokens;
    this.token.password = req.password;
    console.log(this.token);
    this.loginService.newPassword(this.token).subscribe((res) => {
      console.log(res);
      this.toast.success('Your password change was successful');
    }, (error) => {
      console.log(error);
      this.toast.error('the token is invalid or expired');
    });
  }
}
export class UserReset {
  password?: string;
  token?: string;
}
