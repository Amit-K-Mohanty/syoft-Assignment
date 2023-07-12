import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppData } from '../../src/app/services/app-date.service';
import { HttpClientModule } from '@angular/common/http';
import { StorageService } from './services/local-storage.service';
import { ApiRequestService } from './services/api-request.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule

  ],
  providers: [AppData, StorageService, ApiRequestService,
    {
      provide: APP_INITIALIZER,
      useFactory: (ad: AppData) => () => { return ad.ngOnInit() },
      deps: [AppData],
      multi: true
    },],
  bootstrap: [AppComponent]
})
export class AppModule { }
