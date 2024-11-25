import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Moment } from 'moment';

@Injectable({
  providedIn: 'root'
})
export class EonetService {
  private apiUrl: string = `https://eonet.gsfc.nasa.gov/api/v3`;
  private http = inject(HttpClient);

  constructor() { }

  fetchCategories() {
    const url: string = `${this.apiUrl}/categories`;
    return this.http.get<any>(url);
  }

  fetchSources() {
    const url: string = `${this.apiUrl}/sources`;
    return this.http.get<any>(url);
  }

  fetchEvents(category: string, source: string, status: string, limit: number, 
    startDate: Moment, endDate: Moment, coordinates: string[]) {
    const url: string = `${this.apiUrl}/events`;

    let params: HttpParams = new HttpParams();

    if (category) {
      params = params.append('category', category);
    }

    if (source) {
      params = params.append('source', source);
    }

    if (status) {
      params = params.append('status', status);
    }

    if (limit) {
      params = params.append('limit', limit);
    }

    if (startDate && endDate) {
      params = params.append('start', startDate.format('YYYY-MM-DD'))
        .append('end', endDate.format('YYYY-MM-DD'));
    }

    if (coordinates && coordinates.every(coord => coord !== null)) {
      params = params.append('bbox', coordinates.join(','));
    }

    const options: Object = {
      params: params,
      responseType: 'text'
    }

    return this.http.get<any>(url, options);
  }
}
