import { Component, OnDestroy, OnInit } from '@angular/core';
import { NasaApodService } from '../../services/nasa-apod.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { catchError, map, of, Subscription, tap } from 'rxjs';
import { Moment } from 'moment/moment';
import moment from 'moment/moment';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-picture-of-the-day',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './picture-of-the-day.component.html',
  styleUrl: './picture-of-the-day.component.scss',
})
export class PictureOfTheDayComponent implements OnInit, OnDestroy {
  astronomyPicture: any;
  errorMessage!: string;
  date: FormControl = new FormControl(moment());
  minDate: Moment = moment('1995-06-16');
  maxDate: Moment = moment();
  apodSubscription!: Subscription;

  constructor(private apodService: NasaApodService) {}

  ngOnInit() {
    this.getPictureOfTheDay();

    this.date.valueChanges.subscribe(() => {
      if (this.date.valid) {
        this.getPictureOfTheDay();
      }
    });
  }

  getPictureOfTheDay(): void {
    this.astronomyPicture = null;

    this.apodSubscription = this.apodService
      .getAstronomyPictureOfTheDay(this.date.value.format('YYYY-MM-DD'))
      .pipe(
        tap((data) => console.log('Raw Data:', data)),
        catchError((error) => {
          this.errorMessage = 'Error fetching data from NASA API.';
          return of(null);
        }),
        map((data: any) => {
          return {
            title: data.title,
            date: data.date,
            explanation: data.explanation,
            imageUrl: data.url,
            hdUrl: data.hdurl,
          };
        })
      )
      .subscribe({
        next: (apodData: object) => {
          this.astronomyPicture = apodData;
          this.errorMessage = '';
        },
        error: (error) => (this.errorMessage = 'Error processing data.'),
      });
  }

  ngOnDestroy() {
    this.apodSubscription.unsubscribe();
  }
}
