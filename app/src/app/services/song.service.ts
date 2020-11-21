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

  getSong(id: any): Observable<Song> {
    return this.http.get<Song>(API_BASE_URL + '/api/songs/' + id)
    .pipe(catchError(this.errorHandler.handleError));
  }

  newSong(song: Song): Observable<any> {
    console.log(song);
    let fd = new FormData();
    fd.append('song_name', song.song_name);
    fd.append('song_author', song.song_author);
    fd.append('song_description', song.song_description);
    fd.append('song_cover', song.song_image);

    return this.http.post<Song> (API_BASE_URL + '/api/songs/', fd)
    .pipe(catchError(this.errorHandler.handleError));
  } 


}
