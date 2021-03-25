/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { CustomService } from './services/custom.service';


@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>,<ngx-spinner></ngx-spinner>',
})
export class AppComponent implements OnInit {

  constructor(
    private router: Router,
    private spinner: NgxSpinnerService,
    private customService: CustomService
  ) {
    customService.hideShowSpinnerValue.subscribe(value => {
      if (value === 'show') {
        spinner.show();
      } else if (value === 'hide') {
        spinner.hide();
      }
    })
  }

  ngOnInit(): void {

    const currentUser = localStorage.getItem('CurrentUser');
    if (!currentUser) {
      this.router.navigateByUrl("/auth/login");
    }
  }
}
