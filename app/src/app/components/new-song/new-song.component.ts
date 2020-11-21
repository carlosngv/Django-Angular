import { Component, OnInit,ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Song } from '../../shared/song';
import { SongService } from '../../services/song.service';

interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-new-song',
  templateUrl: './new-song.component.html',
  styleUrls: ['./new-song.component.css']
})
export class NewSongComponent implements OnInit {

  songForm: FormGroup;
  file: File;
  imgSelected: string | ArrayBuffer;
  song: Song;

  @ViewChild("fform") songFormDirective;
  constructor(
    private fb: FormBuilder,
    private songService: SongService,
    public dialogRef: MatDialogRef<NewSongComponent>
  ) { 
    this.createForm();
  }

  ngOnInit(): void {

  }

  createForm() {
    this.songForm = this.fb.group({
      song_name: ['', Validators.required],
      song_author: ['', Validators.required],
      song_description: ['', Validators.required],
    });
  }

  imageSelected(event: HTMLInputEvent): void {
    if(event.target.files && event.target.files[0]) {
      this.file = <File>event.target.files[0];
      console.log('FILE', this.file)
      // img preview - Not necessary
      const reader = new FileReader();
      reader.onload = e => this.imgSelected = reader.result;
      
      reader.readAsDataURL(this.file);
    }
  }

  onSubmit(): void {
    this.song = {
      song_name: this.songForm.value.song_name,
      song_author: this.songForm.value.song_author,
      song_description: this.songForm.value.song_description,
      song_image: this.file
    }
    this.songService.newSong(this.song).subscribe((result) => {
      console.log(result);
    });
    this.songForm.reset();
    this.dialogRef.close();
  }


}
