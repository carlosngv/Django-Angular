import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ProcessHttpMsgService {

  constructor() { }

  public handleError(error: HttpErrorResponse | any) {
    let errMsg: string;
    if(error.error instanceof ErrorEvent) {
      errMsg = `ERROR: ${error.error.message}`;
    } else {
      errMsg = `ERROR CODE: ${error.status} - ${error.statusText || ''} \n MESSAGE: ${error.message} `
    }
    return throwError(errMsg);
  }

}
