import { Component, OnInit, Inject } from '@angular/core';
import { SongService } from '../../services/song.service'
import { Song } from '../../shared/song';
import { API_BASE_URL } from '../../shared/apiURL';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  songs: Song[];

  constructor(
    private songService: SongService,
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

  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }

}
