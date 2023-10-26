import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  // TODO
  private apiOrigin = 'http://localhost:8100/admin';

  constructor(private http: HttpClient) {}

  get(path: string, id?: number) {
    const apiUrl = `${this.apiOrigin}${path}`;

    // Create an instance of HttpParams
    let params = new HttpParams();

    // Check if user_uuid is provided and add it as a query parameter
    if (id) {
      params = params.set('id', id);
    }

    return this.http.get(apiUrl, { params });
  }

  post(path: string, data: any) {
    const apiUrl = `${this.apiOrigin}${path}`;
    // Sends post request to server
    console.log('service:', data);
    return this.http.post(apiUrl, data);
  }

  put(path: string, data: any) {
    const apiUrl = `${this.apiOrigin}${path}`;
    // Sends put request to server
    console.log('service:', data);
    return this.http.put(apiUrl, data);
  }
}
