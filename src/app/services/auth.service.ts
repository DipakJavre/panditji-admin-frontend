import { Injectable } from '@angular/core';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private commonService: CommonService
  ) { }

  login(data) {
    return this.commonService.postWithoutToken('Account/login', data)
  }
}
