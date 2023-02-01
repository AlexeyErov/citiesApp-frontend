import {HttpClient, HttpParams} from "@angular/common/http";
import {City} from "../model/city";
import {map, Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {BaseRestService} from "./base-rest/base-rest.service";

@Injectable({
  providedIn: 'root'
})
export class CityService extends BaseRestService {

  constructor(private httpClient: HttpClient) {
    super(httpClient)
  }

  initCitiesCsvDataToDb(): Observable<boolean> {
    return this.get<boolean>(`/init`);
  }

  findCityById(cityId: number): Observable<City> {
    return this.get<City>('/city/' + cityId)
      .pipe(map(response => CityService.mapCity(response)));
  }

  getCitiesTitlesList(): Observable<string[]> {
    return this.get<string[]>(`/city/titles`);
  }

  getCityBySearchText(searchText: string): Observable<City> {
    let params = new HttpParams().set('searchText', searchText);
    return this.get<City>('/city/search', params);
  }

  updateCity(city: City): Observable<City> {
    return this.put<City>('/city/update', city)
      .pipe(map(response => CityService.mapCity(response)));
  }

  public uploadImage(image: File, cityId: number | undefined): Observable<Response> {
    const formData = new FormData();
    formData.append('image', image);

    return this.postFile<any>(`/city/${cityId}/uploadFile`, formData);
  }

  private static mapCity(city: City) {
    return Object.assign(new City(), city);
  }

}
