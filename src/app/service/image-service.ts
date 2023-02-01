import {Injectable} from "@angular/core";
import {BaseRestService} from "./base-rest/base-rest.service";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {City} from "../model/city";
import * as path from "path";

@Injectable({
  providedIn: 'root'
})
export class ImageService extends BaseRestService {

  constructor(private httpClient: HttpClient) {
    super(httpClient)
  }

  getCityImageByCityId(cityId: number): Observable<Blob> {
    return this.getBlob(`/city/${cityId}/image`);
  }

  public uploadImage(image: File, cityId: number | undefined): Observable<boolean> {
    const formData = new FormData();

    formData.append('image', image);

    return this.postFile<any>(`/city/${cityId}/uploadFile`, formData);
  }
}
