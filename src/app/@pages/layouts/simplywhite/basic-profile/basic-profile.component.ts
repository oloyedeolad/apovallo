import { Component, OnInit } from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {BasicProfileService} from './basic-profile.service';
import {IBasicProfile} from './basic-profile.model';
import {LocalStorageService} from 'ngx-webstorage';
import {IUser} from '../../../../account/model/user.model';

@Component({
  selector: 'app-basic-profile',
  templateUrl: './basic-profile.component.html',
  styleUrls: ['./basic-profile.component.scss']
})
export class BasicProfileComponent implements OnInit {

  address: string;
  phone: string;
  gender: string;
  city: string;
  country: string;
  user: IUser;
  buttonText = 'Save Profile';
  basicProfile: IBasicProfile = {};
  options: string[] = ['Female', 'Male'];
  selectedOption: string;
  constructor(private toast: ToastrService, private basicProfileService: BasicProfileService, private $localStorage: LocalStorageService) {
    this.user = $localStorage.retrieve('user');
    this.basicProfileService.findByPatientId(this.user.id).subscribe((res) => {
      this.basicProfile = res.body;
      console.log(this.basicProfile);
      this.address  = this.basicProfile.address;
      this.phone = this.basicProfile.phone;
      this.gender = this.basicProfile.gender;
      this.city = this.basicProfile.city;
      this.country = this.basicProfile.country;
      this.buttonText = 'Update your Profile';
    }, (error) => {
      // this.onSaveError();
      console.log(error);
    });
  }

  ngOnInit() {
  }


  createProfile(profile: any) {
    console.log(profile);
    const basicProfile: IBasicProfile = {
      address: profile.address,
      phone: profile.phone,
      gender: profile.gender,
      city: profile.city,
      country: profile.country,
      user: this.user.id
    };
    if (this.basicProfile.id != null) {
      basicProfile.id =  this.basicProfile.id;
      this.basicProfileService.update(basicProfile, basicProfile.id).subscribe((res) => {
          this.basicProfile = res.body;
          this.onSaveSuccess();
      });
    } else {
      this.basicProfileService.create(basicProfile).subscribe((res) => {
        this.basicProfile = res.body;
        this.onSaveSuccess();
      }, (error) => {
        console.log(error);
        this.onSaveError();
      });
    }
  }

  protected onSaveSuccess(): void {
    /* this.isSaving = false;
     this.isRegistered = true;*/
    this.toast.success('operation successful');
  }

  protected onSaveError(): void {
    /*this.isSaving = false;*/
    this.toast.error('Operation failed, could be your network');
  }
}
