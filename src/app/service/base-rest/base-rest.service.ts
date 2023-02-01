import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseRestService {

  headers: any = {'content-type': 'application/json'}

  restUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }

  get<T>(endpoint: string, params?: HttpParams): Observable<T> {
    return this.http.get<T>(
      this.restUrl + endpoint,
      {params: params}
    );
  }

  getBlob(endpoint: string, params?: HttpParams): Observable<any> {

    return this.http.get(
      this.restUrl + endpoint,
      {params: params, responseType: 'blob'}
    );
  }

  post<T>(endpoint: string, body: any): Observable<T> {


    return this.http.post<T>(
      this.restUrl + endpoint,
      body,
      {'headers': this.headers}
    )
  }

  put<T>(endpoint: string, body: any): Observable<T> {


    return this.http.put<T>(
      this.restUrl + endpoint,
      body,
      {'headers': this.headers}
    )
  }

  postFile<T>(endpoint: string, body: any): Observable<T> {

    return this.http.post<T>(
      this.restUrl + endpoint,
      body
    )
  }

  delete<T>(endpoint: string, params?: HttpParams, body?: any): Observable<T> {
    const options = {
      headers: this.headers,
      body: body,
      params: params
    };
    return this.http.delete<T>(
      this.restUrl + endpoint,
      options
    );
  }
}
