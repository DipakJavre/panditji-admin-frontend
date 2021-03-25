import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class CommonService {
  user: any;
  public isUserLoggedIn: BehaviorSubject<any> = new BehaviorSubject<any>({});

  // baseURL = "https://digimenu-api.herokuapp.com/api/v1/";

  // baseURL = "http://localhost:3000/api/v1/";

  baseURL = "http://api.hariompanditji.com/api/";

  constructor(public http: HttpClient, public toastrService: ToastrService) {
  }

  /* Show error toaster for 401 server error and do logout*/
  handleServerError(errStatus): any {
    if (errStatus && errStatus.status === 401) {
      this.isUserLoggedIn.next({ login: false, err: errStatus });
    }
  }

  getCurrentUser() {
    return localStorage.getItem('CurrentUser') ? JSON.parse(localStorage.getItem('CurrentUser')) : undefined;
  }
  getUser(): any {
    this.user = this.getCurrentUser();
    return this.user;
  }

  getToken(): string {
    const token = localStorage.getItem('token');
    if (token) {
      return token;
    } else {
      return undefined;
    }
  }

  getHeaderForm() {
    let headers = new HttpHeaders(
      {
        'X-Requested-With': 'XMLHttpRequest',
        "Authorization": localStorage.getItem('token'),
      }
    );
    return headers;
  }

  getWithoutToken(url) {
    let headers = new HttpHeaders(
      {
      }
    );
    return this.http.get(this.baseURL + url, { headers: headers })
      .pipe(
        map(result => {
          return result
        }),
        catchError(err => {
          if (err) {
            this.handleServerError(err);
          }
          return throwError(err);
        })
      )
  }

  postwithFormData(url: string, data: FormData, tempId?: any) {
    return this.http.post(this.baseURL + url, data, { headers: this.getHeaderForm() })
      .pipe(
        map((response: any) => {
          if (tempId) {
            response.tempId = tempId;
            return response;
          }
          else
            return response.json();
        }),
        catchError(err => {
          if (err) {
            this.toastrService.error(err.error.Message);
          }
          return throwError(err);
        })
      )
  }

  postWithoutToken(url, data) {

    let headers = new HttpHeaders(
      {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      }
    );

    console.log(data);


    return this.http.post(this.baseURL + url, data)
      .pipe(
        map(result => {
          return result
        }),
        catchError(err => {
          if (err) {
            this.handleServerError(err);
          }
          return throwError(err);
        })
      )
  }

  putWithoutToken(url, data) {
    let headers = new HttpHeaders(
      {
      }
    );
    return this.http.put(this.baseURL + url, data, { headers: headers })
      .pipe(
        map(result => {
          return result
        }),
        catchError(err => {
          if (err) {
            this.handleServerError(err);
          }
          return throwError(err);
        })
      )

  }

  getHeader() {
    let headers = new HttpHeaders(
      {
        "Authorization": localStorage.getItem('token'),
        'Access-Control-Allow-Origin': '*'
      }
    );
    return headers;
  }

  get(url) {
    return this.http.get(this.baseURL + url, { headers: this.getHeader() })
      .pipe(
        map(result => {
          return result
        }),
        catchError(err => {
          if (err) {
            this.handleServerError(err);
          }
          return throwError(err);
        })
      )
  }

  post(url, data?: any) {

    return this.http.post(this.baseURL + url, data ? data : {}, { headers: this.getHeader() })
      .pipe(
        map(result => {
          return result
        }),
        catchError(err => {
          if (err) {
            this.handleServerError(err);
          }
          return throwError(err);
        })
      )
  }


  put(url, data?: any) {
    return this.http.put(this.baseURL + url, data ? data : {}, { headers: this.getHeader() })
      .pipe(
        map(result => {
          return result
        }),
        catchError(err => {
          if (err) {
            this.handleServerError(err);
          }
          return throwError(err);
        })
      )
  }

  delete(url) {
    return this.http.delete(this.baseURL + url, { headers: this.getHeader() })
      .pipe(
        map(result => {
          if (result && result['response'])
            return result['response']
          return null
        }),
        catchError(err => {
          if (err) {
            this.handleServerError(err);
          }
          return throwError(err);
        })
      )
  }

  showError(Error: any) {
    let Msg = Error.error;
    let ErrMessage = '';
    if (typeof Msg === 'object' && Msg !== null) {
      if (typeof Msg?.Result === 'object' && Msg?.Result !== null) {
        for (const [key, value] of Object.entries(Msg?.Result)) {
          ErrMessage = ErrMessage + '<p>' + `${value}` + '</p>';
        }
      }
    }
    if (typeof Msg === 'object' && Msg !== null) {
      if (typeof Msg?.Error === 'object' && Msg?.Error !== null) {
        for (const [key, value] of Object.entries(Msg?.Error)) {
          ErrMessage = ErrMessage + '<p>' + `${key}: ${value}` + '</p>';
        }
      }
    }
    if (Msg != '' && Msg?.Message) {
      ErrMessage = ErrMessage + Msg?.Message;
    }
    this.toastrService.error(ErrMessage, 'Error!', { enableHtml: true });
  }

}
