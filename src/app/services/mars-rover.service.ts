import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MarsRoverService {
  private apiKey: string = environment.nasa_api_key;
  private apiUrl: string = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?api_key=${this.apiKey}`;
  private http = inject(HttpClient);

  constructor() { }

  getNasaMarsRover(date: string) {
    const url: string = this.apiUrl;
    const options: { params: HttpParams } = {
      params: new HttpParams().set('earth_date', date)
    };
    return this.http.get<any>(url, options);
  }
}
