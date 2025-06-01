import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { WeatherService } from './service/weather.service';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [FormsModule, HttpClientModule], // Ensure HttpClientModule is included
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
})
export class WeatherComponent implements OnInit {
  city = '';
  temperatureC: number | null = null;
  unit: 'F' | 'C' = 'F';
  description = 'Loading...';
  loading = false;
  humidity: number | null = null;
  windSpeed: number | null = null;
  searchCity = '';

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.restoreState(); // Load persisted data or detect location
  }

  get displayTemperature(): string {
    if (this.temperatureC === null) return '--';
    return this.unit === 'F'
      ? Math.round(this.temperatureC * 9 / 5 + 32).toString()
      : Math.round(this.temperatureC).toString();
  }

  setUnit(unit: 'F' | 'C') {
    this.unit = unit;
    localStorage.setItem('weatherUnit', unit);
  }

  getWeather() {
    if (!this.city.trim()) {
      this.description = 'Please enter your city.';
      return;
    }
    this.loading = true;
    localStorage.setItem('weatherCity', this.city);

    this.weatherService.getCoordinates(this.city).subscribe({
      next: geoData => {
        if (!geoData?.results?.length) {
          this.description = 'City not found';
          this.loading = false;
          return;
        }

        const { latitude, longitude } = geoData.results[0];
        this.getWeatherByCoordinates(latitude, longitude);

        this.weatherService.reverseGeocode(latitude, longitude).subscribe({
          next: geoData => {
            if (geoData?.results?.length) {
              this.city = geoData.results[0].name;
            }
          }
        });
      },
      error: () => {
        this.description = 'Geocoding API error';
        this.loading = false;
      }
    });
  }

  getWeatherByCoordinates(latitude: number, longitude: number) {
    this.weatherService.getWeather(latitude, longitude).subscribe({
      next: weatherData => {
        if (weatherData?.current_weather) {
          this.temperatureC = weatherData.current_weather.temperature;
          this.description = this.getWeatherDescription(weatherData.current_weather.weathercode);
          this.humidity = weatherData.current_weather.relative_humidity;
          this.windSpeed = weatherData.current_weather.windspeed;
        } else {
          this.description = 'No data';
        }
        this.loading = false;
      },
      error: () => {
        this.description = 'Weather API error';
        this.loading = false;
      }
    });
  }

  onSearch() {
    if (!this.searchCity.trim()) {
      this.useMyLocation();
      return;
    }
    this.city = this.searchCity.trim();
    this.getWeather();
  }

  useMyLocation() {
    if (navigator.geolocation) {
      this.loading = true;
      navigator.geolocation.getCurrentPosition(
        pos => {
          const { latitude, longitude } = pos.coords;
          this.getWeatherByCoordinates(latitude, longitude);
          this.weatherService.reverseGeocode(latitude, longitude).subscribe({
            next: geoData => {
              this.city = geoData?.results?.length ? geoData.results[0].name : 'Washington';
              localStorage.setItem('weatherCity', this.city);
            },
            error: () => {
              this.city = 'Washington';
            }
          });
        },
        () => {
          this.city = 'Washington';
          this.getWeather();
        }
      );
    } else {
      this.city = 'Washington';
      this.getWeather();
    }
  }

  restoreState() {
    const savedCity = localStorage.getItem('weatherCity');
    const savedUnit = localStorage.getItem('weatherUnit');

    if (savedCity) {
      this.city = savedCity;
      this.unit = savedUnit === 'C' ? 'C' : 'F';
      this.getWeather();
    } else {
      this.useMyLocation();
    }
  }

  getWeatherDescription(code: number): string {
    const codes: { [key: number]: string } = {
      0: 'Clear sky', 1: 'Mainly clear', 2: 'Partly cloudy', 3: 'Overcast',
      45: 'Fog', 48: 'Depositing rime fog', 51: 'Light drizzle', 53: 'Drizzle',
      55: 'Dense drizzle', 56: 'Freezing drizzle', 57: 'Freezing drizzle',
      61: 'Slight rain', 63: 'Rain', 65: 'Heavy rain', 66: 'Freezing rain',
      67: 'Freezing rain', 71: 'Slight snow', 73: 'Snow', 75: 'Heavy snow',
      77: 'Snow grains', 80: 'Slight showers', 81: 'Showers', 82: 'Violent showers',
      85: 'Slight snow showers', 86: 'Heavy snow showers', 95: 'Thunderstorm',
      96: 'Thunderstorm + hail', 99: 'Thunderstorm + heavy hail',
    };
    return codes[code] || 'Unknown';
  }
}