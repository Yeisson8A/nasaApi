import { Component } from '@angular/core';
import { PictureOfTheDayComponent } from '../picture-of-the-day/picture-of-the-day.component';
import { PictureRandomComponent } from '../picture-random/picture-random.component';
import { PictureRangeComponent } from '../picture-range/picture-range.component';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-apod',
  standalone: true,
  imports: [
    PictureOfTheDayComponent,
    PictureRandomComponent,
    PictureRangeComponent,
    MatTabsModule
  ],
  templateUrl: './apod.component.html',
  styleUrl: './apod.component.css',
})
export class ApodComponent {}
