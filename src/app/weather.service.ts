import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { WeatherResponse } from './weather.response.dto';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor() {}

  getWeather(): Observable<WeatherResponse[]> {
    const data: WeatherResponse[] = Array.of(
      {
        coord: {
          lon: -122.08,
          lat: 37.39,
        },
        weather: [
          {
            id: 800,
            main: 'Clear',
            description: 'clear sky',
            icon: '01d',
          },
        ],
        base: 'stations',
        main: {
          temp: 282.55,
          feels_like: 281.86,
          temp_min: 280.37,
          temp_max: 284.26,
          pressure: 1023,
          humidity: 100,
        },
        visibility: 10000,
        wind: {
          speed: 1.5,
          deg: 350,
        },
        clouds: {
          all: 1,
        },
        dt: 1560350645,
        sys: {
          type: 1,
          id: 5122,
          message: 0.0139,
          country: 'NL',
          sunrise: 1560343627,
          sunset: 1560396563,
        },
        timezone: -25200,
        id: 420006353,
        name: 'Veenendaal',
        cod: 200,
      },
      {
        coord: {
          lon: -122.08,
          lat: 37.39,
        },
        weather: [
          {
            id: 800,
            main: 'Clear',
            description: 'clear sky',
            icon: '01d',
          },
        ],
        base: 'stations',
        main: {
          temp: 282.55,
          feels_like: 281.86,
          temp_min: 280.37,
          temp_max: 284.26,
          pressure: 1023,
          humidity: 100,
        },
        visibility: 10000,
        wind: {
          speed: 1.5,
          deg: 350,
        },
        clouds: {
          all: 1,
        },
        dt: 1560350645,
        sys: {
          type: 1,
          id: 5122,
          message: 0.0139,
          country: 'MD',
          sunrise: 1560343627,
          sunset: 1560396563,
        },
        timezone: -25200,
        id: 420006353,
        name: 'Chisinau',
        cod: 200,
      },
      {
        coord: {
          lon: -122.08,
          lat: 37.39,
        },
        weather: [
          {
            id: 800,
            main: 'Clear',
            description: 'clear sky',
            icon: '01d',
          },
        ],
        base: 'stations',
        main: {
          temp: 282.55,
          feels_like: 281.86,
          temp_min: 280.37,
          temp_max: 284.26,
          pressure: 1023,
          humidity: 100,
        },
        visibility: 10000,
        wind: {
          speed: 1.5,
          deg: 350,
        },
        clouds: {
          all: 1,
        },
        dt: 1560350645,
        sys: {
          type: 1,
          id: 5122,
          message: 0.0139,
          country: 'LT',
          sunrise: 1560343627,
          sunset: 1560396563,
        },
        timezone: -25200,
        id: 420006353,
        name: 'Kaunas',
        cod: 200,
      },
    );
    return of(data);
  }
}
