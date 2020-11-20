import { Component, OnInit, Inject } from '@angular/core';
import { SongService } from '../../services/song.service';
import { ActivatedRoute } from '@angular/router';
import { Song } from '../../shared/song';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-song-detail',
  templateUrl: './song-detail.component.html',
  styleUrls: ['./song-detail.component.css']
})
export class SongDetailComponent implements OnInit {
  song: Song;
  constructor(
    private songService: SongService,
    public activatedRoute: ActivatedRoute,
    public dialogRef: MatDialogRef<SongDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject('API_BASE_URL') public API_BASE_URL
  ) { }

  ngOnInit(): void {

    this.songService.getSong(this.data).subscribe((data) => {
        this.song = data;
        console.log(this.song);
    });

    /* this.activatedRoute.params.pipe(switchMap((params: Params) => this.songService.getSong(params['id'])))
    .subscribe((data) => {
      this.song = data;
      console.log(this.song);
    }); */
  }

  goBack() {
    this.dialogRef.close();
  }

}
