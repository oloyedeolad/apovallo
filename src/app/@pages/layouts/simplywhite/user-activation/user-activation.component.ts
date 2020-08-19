import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../../account/services/user-register.service';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';

import {IUserActivation} from './user-activation.model';
import {UserActivationService} from './user-activation.service';

@Component({
  selector: 'app-user-activation',
  templateUrl: './user-activation.component.html',
  styleUrls: ['./user-activation.component.scss']
})
export class UserActivationComponent implements OnInit {

  constructor(private activationService: UserActivationService, private toast: ToastrService, private route: ActivatedRoute,
              private router: Router) {
      const user = this.route.snapshot.paramMap.get('user');
      const activation_key = this.route.snapshot.paramMap.get('activation_key');
      console.log(user);
      console.log(activation_key);
      const userActivation: IUserActivation = {
        user: Number(user),
        activation_key: Number(activation_key)
      };
      this.activationService.create(userActivation).subscribe((res) => {
        this.toast.success('The activation of your account is successful, you be redirected to login', 'Successful Activation');
        router.navigate(['']);
      }, () => {
        this.toast.error('Activation failed, contact admin', 'Failed Activation');
      });
  }

  ngOnInit() {
  }

}
