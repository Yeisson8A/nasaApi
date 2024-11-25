import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NasaImageVideoLibraryService {
  private apiUrl: string = `https://images-api.nasa.gov/search`;
  private http = inject(HttpClient);

  constructor() { }

  getResults(search: string, page: number | null = null) {
    const url: string = this.apiUrl;
    let params: HttpParams = new HttpParams();
    params = params.append('q', search);
    params = params.append('media_type', 'image,video,audio');

    if (page) {
      params = params.append('page', page);
    }

    const options: { params: HttpParams } = {
      params: params
    };

    return this.http.get<any>(url, options).pipe(
      catchError((error) => {
        console.error('Error fetching results:', error);
        return of(null);
      })
    );
  }

  getLinksCollection(url: string) {
    return this.http.get<any>(url);
  }
}
