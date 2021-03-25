import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomService {

  public hideShowSpinnerValue: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public refreshArticle: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public refreshPooja: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private router: Router,
    public toastrService: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  public showSuccessToast(msg: string, title: string = "Success", options?: any) {
    return this.toastrService.success(msg, title, options);
  }
  public showErrorToast(msg: string = "Something went wrong. Please try again later...", title: string = "Oops!", options?: any) {
    return this.toastrService.error(msg, title, options);
  }
  public showWarningToast(msg: string, title: string = "Warning!", options?: any) {
    return this.toastrService.warning(msg, title, options);
  }
  public showInfoToast(msg: string, title: string = "Info!", options?: any) {
    return this.toastrService.info(msg, title, options);
  }

  public goToPage(url) {
    this.router.navigateByUrl(url);
  }

  public showSpinner() {
    this.hideShowSpinnerValue.next('show');
    this.spinner.show();
  }

  public hideSpinner() {
    this.hideShowSpinnerValue.next('hide');
    this.spinner.hide();
  }
}
