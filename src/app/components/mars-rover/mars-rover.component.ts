import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Moment } from 'moment/moment';
import moment from 'moment/moment';
import { Subscription } from 'rxjs';
import { MarsRoverService } from '../../services/mars-rover.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mars-rover',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './mars-rover.component.html',
  styleUrl: './mars-rover.component.scss'
})
export class MarsRoverComponent {
  roverPictures: any[] = [];
  errorMessage!: string;
  date: FormControl = new FormControl(moment('2015-06-03'));
  minDate: Moment = moment('1995-06-16');
  maxDate: Moment = moment();
  marsRoverSubscription!: Subscription;

  constructor(private marsRoverService: MarsRoverService) {}
  
  ngOnInit() {
    this.getPicturesMarsRover();

    this.date.valueChanges.subscribe(() => {
      if (this.date.valid) {
        this.getPicturesMarsRover();
      }
    });
  }

  getPicturesMarsRover(){
    this.roverPictures = [];
    this.marsRoverSubscription = this.marsRoverService.getNasaMarsRover(this.date.value.format('YYYY-MM-DD'))
      .subscribe({
        next: (marsRoverData) => {
          this.errorMessage = '';
          this.roverPictures = marsRoverData.photos;
        },
        error: (error) => {
          this.errorMessage = 'Error processing data.';
        }
      });
  }

  ngOnDestroy() {
    this.marsRoverSubscription.unsubscribe();
  }
}
