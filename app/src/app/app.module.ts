import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { API_BASE_URL } from './shared/apiURL'

import { MaterialModule } from './material/material.module';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { SongDetailComponent } from './components/song-detail/song-detail.component'

import { HttpClientModule } from "@angular/common/http";
import { FlexLayoutModule } from "@angular/flex-layout";
import { NewSongComponent } from './components/new-song/new-song.component';

import { FormsModule, ReactiveFormsModule } from "@angular/forms";


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    HeaderComponent,
    NewSongComponent,
    SongDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: 'API_BASE_URL',
      useValue: API_BASE_URL
    }
    
  ],
  entryComponents: [
    NewSongComponent,
    SongDetailComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
