import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component'
import { SongDetailComponent } from './components/song-detail/song-detail.component'
export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'song/:id', component: SongDetailComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' }
]