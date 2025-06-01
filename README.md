# Weather App (Angular 18)

A sleek and responsive weather app built with Angular 18. Instantly check the current weather for any city or your current location, with a beautiful, modern UI.

---

## Features

- **Search by City:** Instantly get weather details by city name.
- **Current Location:** Detects and displays weather for your actual location.
- **Real-time Weather Data:** Shows temperature (°F/°C), weather description, humidity, and wind speed.
- **Unit Toggle:** Easily switch between Fahrenheit and Celsius.
- **Persistent Preferences:** Remembers your last city and unit selection with local storage.
- **Error Handling:** Friendly messages for API errors or invalid cities.
- **Mobile-Friendly Design:** Looks great on both desktop and mobile.
- **Loading Spinner:** Clear feedback while fetching data.

---

## User Interface
## User Interface

Below is a screenshot of the Weather App interface:

![Weather App Screenshot](weather-app/public/Assets/screenshot.png)

- **Location Display:** Shows your city or “Detecting location…” with an SVG icon.
- **Search Bar:** Find weather for any city—just type and press Enter.
- **Unit Toggle:** Stylish buttons to switch temperature units.
- **Weather Icon:** SVG-based for a modern, scalable look.
- **Temperature & Description:** Prominent, easy-to-read values.
- **Loading Spinner:** Animated indicator during API calls.

---

## WeatherService (API Integration)

- **getCoordinates(city):** Uses Open-Meteo’s Geocoding API to find a city’s coordinates.
- **getWeather(lat, lon):** Fetches weather data for the specified location.
- **reverseGeocode(lat, lon):** Converts coordinates back to a city name.

_All API requests use Angular’s HttpClient. **No API key is needed** (Open-Meteo is free and public)._

---

## Styling & Design

- Modern gradients and glassmorphism effects for a clean, elegant look.
- Large, rounded buttons and inputs for usability.
- Animated loading spinner for great user feedback.
- Consistent color theme using CSS variables.
- SVG icons for sharp, scalable graphics.

---

## How to Run

1. **Clone the repo:**
    ```bash
    git clone https://github.com/GitAbdulkerim/My-weather-App.git
    ```

2. **Install dependencies:**
    ```bash
    cd My-weather-App
    npm install
    ```

3. **Run the app:**
    ```bash
    ng serve
    ```
    Open [http://localhost:4200](http://localhost:4200) in your browser.

---

## AI Assistance

- Used ChatGPT for code generation, API integration, debugging, and code reviews.
- Ensured code quality and security by following AI-suggested best practices.
- **No API keys or private data exposed—safe for public use.**

---

## Reflection

- **What I Learned:** Integrating public APIs and using AI for coding help.
- **Challenge:** Graceful error handling and user-friendly design.
- **Proud of:** Clean UI and instant city search.
- **What I’d Improve:** Add multi-city tracking, weather history, and automated tests.

---

## License

This project is for educational purposes.  
Weather data provided by [Open-Meteo](https://open-meteo.com/).

---

## Author

**Abdulkerim Metenea**
