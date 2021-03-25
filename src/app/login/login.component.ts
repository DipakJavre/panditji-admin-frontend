import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { CommonService } from '../services/common.service';
import { CustomService } from '../services/custom.service';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild('f', { static: false }) loginForm: NgForm;

  dataModel: any = {};
  constructor(
    public authSevice: AuthService,
    public customService: CustomService
  ) { }

  ngOnInit(): void {
    const currentUser = localStorage.getItem('CurrentUser');
    if (currentUser) {
      this.customService.goToPage('/');
    } else {
      this.customService.goToPage('/auth/login')
    }
  }

  login() {
    this.customService.showSpinner();
    this.authSevice.login(this.dataModel).subscribe(
      (res: any) => {
        console.log(res);
        this.customService.showSuccessToast('Login succefully');
        this.loginForm.resetForm();
        this.dataModel = {};
        localStorage.setItem("CurrentUser", JSON.stringify(res['data']));
        localStorage.setItem("token", 'bearer ' + res['data']['token'])
        this.customService.hideSpinner();
        this.customService.goToPage('/')
      }, (err: any) => {
        this.customService.hideSpinner();
        this.customService.showErrorToast("Oops! something went wrong", "Error")
      }
    )
  }

}
