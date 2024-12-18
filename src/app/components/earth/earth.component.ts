import { Component, OnDestroy, OnInit } from '@angular/core';
import { Category } from '../../interfaces/category';
import { Source } from '../../interfaces/source';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { map, Subscription } from 'rxjs';
import { EonetService } from '../../services/eonet.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { NgxJsonViewerModule } from 'ngx-json-viewer';

@Component({
  selector: 'app-earth',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
    NgxJsonViewerModule
  ],
  templateUrl: './earth.component.html',
  styleUrl: './earth.component.css',
})
export class EarthComponent implements OnInit, OnDestroy {
  categories: Category[] = [];
  sources: Source[] = [];
  eventsFiltersForm!: FormGroup;
  serverError: any;
  events: any;
  eventsSubscription!: Subscription;

  constructor(
    private eonetService: EonetService,
    private formBuilder: FormBuilder
  ) {
    this.eventsFiltersForm = this.formBuilder.group({
      category: [''],
      source: [null],
      status: [null],
      limit: [null],
      range: this.formBuilder.group({
        start: [null],
        end: [null],
      }),
      coordinates: this.formBuilder.group({
        minLat: [null],
        maxLat: [null],
        minLong: [null],
        maxLong: [null],
      }),
    });
  }

  ngOnInit(): void {
    this.fetchCategories();
    this.fetchSources();
  }

  fetchCategories() {
    this.eonetService
      .fetchCategories()
      .pipe(
        map((data: any) =>
          data.categories.map(
            (categoryData: any): Category => ({
              id: categoryData.id,
              title: categoryData.title,
            })
          )
        )
      )
      .subscribe((data: Category[]) => {
        this.categories = data;
      });
  }

  fetchSources() {
    this.eonetService
      .fetchSources()
      .pipe(
        map((data: any) =>
          data.sources.map(
            (sourceData: any): Source => ({
              id: sourceData.id,
              title: sourceData.title,
            })
          )
        )
      )
      .subscribe((data: Source[]) => {
        this.sources = data;
      });
  }

  getEvents() {
    this.serverError = null;
    this.events = null;
    this.eventsSubscription = this.eonetService
      .fetchEvents(
        this.eventsFiltersForm.value.category,
        this.eventsFiltersForm.value.source,
        this.eventsFiltersForm.value.status,
        this.eventsFiltersForm.value.limit,
        this.eventsFiltersForm.value.range.start,
        this.eventsFiltersForm.value.range.end,
        Object.values(this.eventsFiltersForm.value.coordinates)
      )
      .pipe(map((data) => JSON.parse(data)))
      .subscribe({
        next: (data: any) => {
          console.log(data);
          this.events = data;
        },
        error: (error: any) => {
          this.serverError = error;
        },
      });
  }

  clearAll() {
    this.events = null;
    this.eventsFiltersForm.reset();
  }

  ngOnDestroy() {
    this.eventsSubscription.unsubscribe();
  }
}
