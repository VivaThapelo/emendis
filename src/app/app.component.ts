import { Component } from '@angular/core';
import { BehaviorSubject, first, tap } from 'rxjs';
import { WeatherResponse } from './weather.response.dto';
import { WeatherStateService } from './weather.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  weatherData$: BehaviorSubject<WeatherResponse[]> = new BehaviorSubject<WeatherResponse[]>([])
  
  constructor(private weatherState: WeatherStateService){}

  ngOnInit(): void {
    console.log(this.weatherState.weatherData.value)
    this.weatherData$.next(this.weatherState.weatherData.value)
  }

  onBookmark($event: any, weather: WeatherResponse) {
    this.weatherState.setBookmark({name:weather.name, country: weather.sys.country, bookmarked: $event.target.checked})
    this.weatherData$.pipe(
      first(data => !!data),
      tap(data => this.weatherState.updateWeatherData(data)),
      tap(data => data.sort((a, b) => {
        const t: boolean = a.bookmarked || false
        const f: boolean = b.bookmarked || false
       return (+f) - (+t)
      }))
    ).subscribe()
  }

  ngOnDestroy(): void {
    this.weatherState.close()
  }

  identify(index: number, item: WeatherResponse){
    return item; 
 }


}
