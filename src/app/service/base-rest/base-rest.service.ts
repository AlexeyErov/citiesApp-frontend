import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class BaseRestService {

  headers: any = {'content-type': 'application/json'}

  constructor(private http: HttpClient) {
  }

  get<T>(endpoint: string, params?: HttpParams): Observable<T> {
    return this.http.get<T>(
      environment.common.restUrl + endpoint,
      {params: params}
    );
  }

  getBlob(endpoint: string, params?: HttpParams): Observable<any> {

    return this.http.get(
      environment.common.restUrl + endpoint,
      {params: params, responseType: 'blob'}
    );
  }

  post<T>(endpoint: string, body: any): Observable<T> {


    return this.http.post<T>(
      environment.common.restUrl + endpoint,
      body,
      {'headers': this.headers}
    )
  }

  put<T>(endpoint: string, body: any): Observable<T> {


    return this.http.put<T>(
      environment.common.restUrl + endpoint,
      body,
      {'headers': this.headers}
    )
  }

  postFile<T>(endpoint: string, body: any): Observable<T> {

    return this.http.post<T>(
      environment.common.restUrl + endpoint,
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
      environment.common.restUrl + endpoint,
      options
    );
  }
}
