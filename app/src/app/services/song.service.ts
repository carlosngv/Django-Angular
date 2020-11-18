import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_BASE_URL } from '../shared/apiURL';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ProcessHttpMsgService } from './process-http-msg.service';
import { Song } from '../shared/song';

@Injectable({
  providedIn: 'root'
})
export class SongService {

  constructor(
    private http: HttpClient,
    private errorHandler: ProcessHttpMsgService
  ) { }


  getSongs(): Observable<Song[]> {
    return this.http.get<Song[]>(API_BASE_URL + '/api/songs/')
    .pipe(catchError(this.errorHandler.handleError));
  }


}
