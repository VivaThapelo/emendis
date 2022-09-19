import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ToCelciusPipe } from './to-celcius.pipe';
import { WeatherStateService } from './weather.state';

@NgModule({
  declarations: [
    AppComponent,
    ToCelciusPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [WeatherStateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
