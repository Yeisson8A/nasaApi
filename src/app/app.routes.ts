import { Routes } from '@angular/router';
import { ApodComponent } from './components/apod/apod.component';
import { LibraryComponent } from './components/library/library.component';
import { EarthComponent } from './components/earth/earth.component';
import { MarsRoverComponent } from './components/mars-rover/mars-rover.component';

export const routes: Routes = [
    {
        path: '', redirectTo: '/apod', pathMatch: 'full'
    },
    {
        path: 'apod', component: ApodComponent
    },
    {
        path: 'library', component: LibraryComponent
    },
    {
        path: 'earth', component: EarthComponent
    },
    {
        path: 'mars-rover', component: MarsRoverComponent
    }
];
