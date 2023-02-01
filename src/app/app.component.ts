import {Component, OnInit} from '@angular/core';
import {CityService} from "./service/city.service";
import {City} from "./model/city";
import {DomSanitizer} from "@angular/platform-browser";
import {ImageService} from "./service/image-service";

const FILTER_PAG_REGEX = /[^0-9]/g;

class ImageSnippet {
  pending: boolean = false;
  status: string = 'init';

  constructor(public src: string, public file: any) {
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  cityData = new City();
  page = 1;
  searchData: any;
  citiesTitles: string[] = [];
  showCityTitleEditErrorMessage = false;
  showPageChangeErrorMessage = false;
  showWrongFormatMessage = false;
  errorMessageVisible = false;
  infoMessageVisible = false;
  isUploadedToFileStorage = false;
  isEditable = true;
  selectedFile: ImageSnippet | undefined;
  cityImage: any;
  isDataInitialized = false;

  constructor(
    private cityService: CityService,
    private imageService: ImageService,
    private sanitizer: DomSanitizer
  ) {
  }

  ngOnInit() {
    this.initDataFromCSV();
  }

  initDataFromCSV() {
    this.cityService.initCitiesCsvDataToDb().subscribe(result => {
      if (result) {
        this.getCitiesTitleList();
        this.findCityById(this.page);
      }
    });
  }

  findCityById(cityId: number) {
    this.cityService.findCityById(cityId).subscribe(result => {
      if (result) {
        this.cityData = result;
        this.getCityImageByCityId(this.cityData.id);
      }
    });
  }

  getCityImageByCityId(cityId: number | undefined) {
    if (cityId) {
      this.imageService.getCityImageByCityId(cityId).subscribe((blob: any) => {
        this.showCityData(blob);
        let objectURL = URL.createObjectURL(blob);
        this.cityImage = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        this.isDataInitialized = true;
      });
    }
  }

  getCitiesTitleList() {
    this.cityService.getCitiesTitlesList().subscribe(result => {
      this.citiesTitles = result;
    });
  }

  selectPage(page: string) {
    if (+page > this.citiesTitles.length) {
      this.showPageChangeErrorMessage = true;
    } else {
      this.showPageChangeErrorMessage = false;
      this.showWrongFormatMessage = false;
      this.searchData = '';
      this.hideMessage();
      this.page = parseInt(page, 10) || 1;
      this.findCityById(this.page);
    }
  }

  formatInput(input: HTMLInputElement) {
    input.value = input.value.replace(FILTER_PAG_REGEX, '');
  }

  searchCity(): void {
    if (this.searchData.length > 2) {
      this.cityService.getCityBySearchText(this.searchData).subscribe(result => {
        if (result) {
          this.cityData = result;
          if (this.cityData.id) {
            this.page = this.cityData.id;
            this.findCityById(this.page);
          }
          this.errorMessageVisible = false;
          this.infoMessageVisible = false;
        } else {
          this.errorMessageVisible = true;
        }
      });
      this.searchData = '';
    } else {
      this.infoMessageVisible = true;
    }
  }

  changeCityTitle() {
    if (this.isEmptyOrSpaces(this.cityData.title)) {
      this.showCityTitleEditErrorMessage = true;
    } else {
      this.cityService.updateCity(this.cityData).subscribe(result => {
        this.cityData = result;
        this.getCitiesTitleList();
      });
      this.toggleEdition();
      this.showCityTitleEditErrorMessage = false;
    }
  }

  toggleEdition() {
    this.isEditable = !this.isEditable;
  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    this.hideMessage();
    if (this.isValidFileType(file.type)) {
      this.showWrongFormatMessage = false;
      const reader = new FileReader();

      reader.addEventListener('load', (event: any) => {

        this.selectedFile = new ImageSnippet(event.target.result, file);

        this.selectedFile.pending = true;
        this.imageService.uploadImage(this.selectedFile.file, this.cityData.id).subscribe(
          (result) => {
            if (result) {
              this.getCityImageByCityId(this.cityData.id);
              this.onSuccess();
            }
          },
          (err) => {
            this.onError();
          })
      });

      reader.readAsDataURL(file);
    } else {
      this.showWrongFormatMessage = true;
    }

  }

  private onSuccess() {
    if (this.selectedFile) {
      this.selectedFile.pending = false;
      this.selectedFile.status = 'ok';
    }
  }

  private onError() {
    if (this.selectedFile) {
      this.selectedFile.pending = false;
      this.selectedFile.status = 'fail';
      this.selectedFile.src = '';
    }
  }

  private hideMessage() {
    if (this.selectedFile) {
      this.selectedFile.status = 'init';
    }
  }

  private showCityData(blob: Blob) {
    this.isUploadedToFileStorage = blob.size != 0;
  }

  private isEmptyOrSpaces(str: string | undefined) {
    if (str) {
      return str.match(/^ *$/) !== null;
    } else {
      return true;
    }
  }

  private isValidFileType(fileType: string) {
    return fileType=="image/jpg" || fileType=="image/jpeg" || fileType=="image/png" || fileType=="image/JPG";
  }

}
