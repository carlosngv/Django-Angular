import { Component, OnDestroy, AfterViewInit ,OnInit, Inject, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { SongService } from '../../services/song.service'
import { Song } from '../../shared/song';
import { MatDialog } from '@angular/material/dialog';
import { SongDetailComponent } from '../song-detail/song-detail.component';
import { NewSongComponent } from '../new-song/new-song.component';
import { Subscription } from 'rxjs';
import { MediaChange, MediaObserver } from '@angular/flex-layout';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  songs: Song[];
  mediaSub: Subscription;
  deviceXS: boolean;
  position = 2;
  @ViewChild('sloganText') sloganText: ElementRef;

  constructor(
    private songService: SongService,
    private dialog: MatDialog,
    public mediaObserver: MediaObserver,
    private renderer: Renderer2,
    @Inject('API_BASE_URL') public API_BASE_URL
  ) { 
  }

  ngOnInit(): void {
    this.getSongs();
    this.mediaSub = this.mediaObserver.media$.subscribe((result:MediaChange) => {
      console.log(result.mqAlias);
      this.deviceXS = result.mqAlias === 'xs' ? true : false;
      if(this.deviceXS) {
        this.position = 1;
        this.renderer.setStyle(this.sloganText.nativeElement, 'font-size','40px')
        this.renderer.setStyle(this.sloganText.nativeElement, 'line-height','50px')
      } else {
        this.position = 2
        this.renderer.setStyle(this.sloganText.nativeElement, 'font-size','65px')
      }
    });
  }

  getSongs() {
    this.songService.getSongs().subscribe(
      res => {
        this.songs = res;
        console.log(this.songs);
      }
    );
  }

  ngOnDestroy(){
    
    this.mediaSub.unsubscribe();
  }

  ngAfterViewInit() {
    
      console.log(this.sloganText)
  }

  showSong(data: any) {
    this.dialog.open(SongDetailComponent, {
      data: data,
      width: "350px",
      height: "600px"
    });
  }

  newSong(){
    let dialogRef = this.dialog.open(NewSongComponent, {
      width: '500px',
      height: '600px'
    });

    dialogRef.afterClosed().subscribe(() => {
      this.songService.getSongs().subscribe(
        res => {
          this.songs = res;
          console.log(this.songs);
        }
      );
    });
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }

}
