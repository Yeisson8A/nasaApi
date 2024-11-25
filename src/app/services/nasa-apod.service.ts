import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NasaApodService {
  private apiKey: string = environment.nasa_api_key;
  private apiUrl: string = `https://api.nasa.gov/planetary/apod?api_key=${this.apiKey}`;
  private http = inject(HttpClient);

  constructor() { }

  getAstronomyPictureOfTheDay(date: string) {
    const url: string = this.apiUrl;
    const options: { params: HttpParams } = {
      params: new HttpParams().set('date', date)
    };
    return this.http.get<any>(url, options);
  }

  getAstronomyPicturesInRange(startDate: string, endDate: string) {
    const url: string = this.apiUrl;
    const options: { params: HttpParams } = {
      params: new HttpParams()
        .set('start_date', startDate)
        .set('end_date', endDate),
    };
    return this.http.get<any[]>(url, options);
  }

  getRandomImages(count: number) {
    const url: string = this.apiUrl;
    const options: { params: HttpParams } = {
      params: new HttpParams().set('count', count)
    };
    return this.http.get<any[]>(url, options);
  }
}
