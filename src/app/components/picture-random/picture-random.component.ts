import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { catchError, map, of, Subscription, tap } from 'rxjs';
import { NasaApodService } from '../../services/nasa-apod.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-picture-random',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './picture-random.component.html',
  styleUrl: './picture-random.component.scss'
})
export class PictureRandomComponent implements OnInit, OnDestroy {
  imagesCount: FormControl = new FormControl<number>(1);
  errorMessage: string = '';
  astronomyPictures: any[] = [];
  randomPictureSubscription!: Subscription;

  constructor(private apodService: NasaApodService) {}
  
  ngOnInit() {
    this.getRandomPictures();
  }

  getRandomPictures(): void {
    this.astronomyPictures = [];
    this.randomPictureSubscription = this.apodService.getRandomImages(this.imagesCount.value).pipe(
      tap((data) => console.log('Raw Data:', data)),
      catchError((error) => {
        this.errorMessage = 'Error fetching data from NASA API.';
        return of([]);
      }),
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
        this.astronomyPictures = apodData;
        this.errorMessage = '';
      },
      error: (error) => this.errorMessage = 'Error processing data.'
    });
  }

  ngOnDestroy() {
    this.randomPictureSubscription.unsubscribe();
  }
}
