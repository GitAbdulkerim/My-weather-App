import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private geoApi = 'https://geocoding-api.open-meteo.com/v1';
  private weatherApi = 'https://api.open-meteo.com/v1/forecast';

  constructor(private http: HttpClient) {}

  getCoordinates(city: string): Observable<any> {
    return this.http.get<any>(`${this.geoApi}/search?name=${encodeURIComponent(city)}&count=1`);
  }

  getWeather(latitude: number, longitude: number): Observable<any> {
    return this.http.get<any>(`${this.weatherApi}?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
  }


  reverseGeocode(latitude: number, longitude: number): Observable<any> {
  return this.http.get<any>(`https://geocoding-api.open-meteo.com/v1/reverse?latitude=${latitude}&longitude=${longitude}&count=1`);
}
}