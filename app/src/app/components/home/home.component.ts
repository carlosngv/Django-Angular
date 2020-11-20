import { Component, OnInit, Inject } from '@angular/core';
import { SongService } from '../../services/song.service'
import { Song } from '../../shared/song';
import { API_BASE_URL } from '../../shared/apiURL';
import { MatDialog } from '@angular/material/dialog';
import { SongDetailComponent } from '../song-detail/song-detail.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  songs: Song[];

  constructor(
    private songService: SongService,
    private dialog: MatDialog,
    @Inject('API_BASE_URL') public API_BASE_URL
  ) { }

  ngOnInit(): void {
    this.songService.getSongs().subscribe(
      res => {
        this.songs = res;
        console.log(this.songs);
      }
    )
  }

  showSong(data: any) {
    this.dialog.open(SongDetailComponent, {
      data: data,
      width: "320px",
      height: "600px"
    })
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }

}
