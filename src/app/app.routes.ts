import { Routes } from '@angular/router';
import { ApodComponent } from './components/apod/apod.component';
import { LibraryComponent } from './components/library/library.component';
import { EarthComponent } from './components/earth/earth.component';

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
    }
];
