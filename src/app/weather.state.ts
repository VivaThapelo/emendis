import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  first,
  Subject,
  takeUntil,
  tap,
  throwError,
} from 'rxjs';
import { Bookmark } from './bookmark.dto';
import { WeatherResponse } from './weather.response.dto';
import { WeatherService } from './weather.service';

@Injectable({ providedIn: 'root' })
export class WeatherStateService {
  private readonly shouldClose: Subject<boolean> = new Subject<boolean>();
  readonly weatherData: BehaviorSubject<WeatherResponse[]> = new BehaviorSubject<WeatherResponse[]>(this.getLocalState());
  readonly bookmarks: BehaviorSubject<Bookmark[]> = new BehaviorSubject<Bookmark[]>([]);
  constructor(private readonly weatherService: WeatherService) {
    this.weatherData.pipe(takeUntil(this.shouldClose));
    this.bookmarks.pipe(takeUntil(this.shouldClose));
    this.weatherService
      .getWeather()
      .pipe(
        first((data) => !!data),
        tap((data) => this.updateWeatherData(data)),
        catchError((error) => throwError(error))
      )
      .subscribe();
  }
  

  setBookmark(bookmark: Bookmark) {
    let marks: Bookmark[] = this.bookmarks.value.length > 0 ? this.bookmarks.value : JSON.parse(localStorage.getItem('bookmarks') || '');
    console.log(marks)
    let exist = marks.find((mark) => mark.name === bookmark.name && mark.country === bookmark.country)
    if (exist) { exist.bookmarked = bookmark.bookmarked; } else { marks.push(bookmark)}
    this.bookmarks.next(marks);
    localStorage.setItem("bookmarks", JSON.stringify(marks))
  }

  mapBookmarks(items: WeatherResponse[]): WeatherResponse[] {
    const marks: Bookmark[] = this.bookmarks.value.length > 0 ? this.bookmarks.value : JSON.parse(localStorage.getItem('bookmarks') || '');
    return items.map(item => {
      const curr = marks?.find(mark => item.name === mark.name && item.sys.country === mark.country) || undefined
      item = { ...item, bookmarked: curr ? curr.bookmarked : false }
      return item
    });
  }

  getLocalState(): WeatherResponse[] {
    const local: WeatherResponse[] = JSON.parse(localStorage.getItem('weather') || '[]');
    return local as [];
  }

  setLocalState(data: WeatherResponse[]) {
    localStorage.setItem('weather', JSON.stringify(data));
  }

  updateWeatherData(data: WeatherResponse[]): void {
    const bookedWeather = this.mapBookmarks(data)
    const sortedWeather = bookedWeather.sort((a, b) => {
        const t: boolean = a.bookmarked || false
        const f: boolean = b.bookmarked || false
       return (+f) - (+t)
    })
    this.weatherData.next(sortedWeather);
    this.setLocalState(sortedWeather);
  }

  close(): void {
    this.shouldClose.next(true);
  }
}
