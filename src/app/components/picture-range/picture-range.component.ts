import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { catchError, map, mergeMap, of, Subscription, take, tap, toArray } from 'rxjs';
import { Moment } from 'moment/moment';
import moment from 'moment/moment';
import { NasaApodService } from '../../services/nasa-apod.service';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-picture-range',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './picture-range.component.html',
  styleUrl: './picture-range.component.scss'
})
export class PictureRangeComponent implements OnInit, OnDestroy {
  errorMessage: string = '';
  astronomyPictures: any[] = [];
  range: FormGroup = new FormGroup({
    start: new FormControl(moment().subtract(1,'w')),
    end: new FormControl(moment()),
  });
  minDate: Moment = moment('1995-06-16');
  maxDate: Moment = moment();
  rangeSubscription!: Subscription;

  constructor(private apodService: NasaApodService) {}
  
  ngOnInit() {
    this.getPictureOfTheDayInRange();

    this.range.valueChanges.subscribe(() => {
      if(this.range.valid && this.range.get('start') && this.range.get('end')) {
        this.getPictureOfTheDayInRange();
      }
    });
  }

  getPictureOfTheDayInRange(){
    this.astronomyPictures = [];
    this.rangeSubscription = this.apodService.getAstronomyPicturesInRange(
      this.range.value.start.format('YYYY-MM-DD'),
      this.range.value.end.format('YYYY-MM-DD'),
    ).pipe(
      tap((data) => console.log('Raw Data:', data)),
      catchError((error) => {
        this.errorMessage = 'Error fetching data from NASA API.';
        return of([]);
      }),
      mergeMap((data: any[]) => data.reverse()),
      take(7),
      toArray(),
      map((data: any[]) => {
        return data.map(apodData => {
          return {
            title: apodData.title,
            explanation: apodData.explanation,
            imageUrl: apodData.url,
            date: apodData.date,
          };
        });
      })
    ).subscribe({
      next: (apodData) => {
        this.errorMessage = '';
        this.astronomyPictures = apodData;
      },
      error: (error) => {
        this.errorMessage = 'Error processing data.';
      }
    });
  }

  ngOnDestroy() {
    this.rangeSubscription.unsubscribe();
  }
}
