import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CityService} from "./service/city.service";
import {NgbModule, NgbTypeaheadModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from "@angular/common/http";
import {Ng2CompleterModule} from 'ng2-completer';
import {AppRoutingModule} from "./app-routing.module";
import {ImageService} from "./service/image-service";
import {MatIconModule} from "@angular/material/icon";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@NgModule({
  bootstrap: [
    AppComponent
  ],
  declarations: [
    AppComponent
  ],
    imports: [
        FormsModule,
        BrowserModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        NgbModule,
        HttpClientModule,
        NgbTypeaheadModule,
        AppRoutingModule,
        Ng2CompleterModule,
        MatIconModule,
        MatProgressSpinnerModule
    ],
  providers: [CityService, ImageService],
})
export class AppModule {
}
