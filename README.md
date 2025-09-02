# Weather Now - 7 Day Forecast App

A React-based weather application that provides 7-day weather forecasts for any city worldwide. Built for the "Weather Now" assignment as specified in the take-home challenge.

## 🌟 Features

- **City Search**: Enter any city name to get weather data
- **7-Day Forecast**: Complete week-long weather outlook
- **Detailed Information**: Temperature highs/lows, precipitation, wind speed, and weather conditions
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Beautiful UI**: Modern, clean interface with weather icons and animations
- **Error Handling**: Graceful handling of invalid city names and network errors

## 🛠️ Technology Stack

- **Framework**: React 18
- **Styling**: CSS3 with responsive design
- **API**: Open-Meteo API (free, no authentication required)
- **State Management**: React useState hooks

## 🚀 Quick Start

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation Steps

1. **Extract the project files** to your desired directory
2. **Open Terminal/Command Prompt** and navigate to the project folder
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Start the development server**:
   ```bash
   npm start
   ```
5. **Open your browser** and go to `http://localhost:3000`

## 📱 How to Use

1. Enter a city name in the search field (e.g., "London", "New York", "Tokyo")
2. Click the "Get Weather" button
3. View the 7-day weather forecast with detailed information for each day

## 🌐 API Information

This app uses the **Open-Meteo API**, which provides:
- Free access with no API key required
- Geocoding service for city name to coordinates conversion
- Comprehensive weather data including temperature, precipitation, and wind speed
- 7-day forecast data

## 📂 Project Structure

```
weather-app/
├── public/
│   └── index.html
├── src/
│   ├── App.js          # Main component with weather logic
│   ├── App.css         # Styling for the application
│   ├── index.js        # React DOM rendering
│   ├── index.css       # Global styles
│   └── reportWebVitals.js
├── package.json        # Dependencies and scripts
└── README.md          # Project documentation
```

## 🎨 Key Features Implemented

- **User-Friendly Interface**: Clean, modern design following current web design trends
- **Weather Icons**: Emoji-based weather icons for visual appeal
- **Temperature Display**: Both max and min temperatures for each day
- **Additional Data**: Precipitation and wind speed information
- **Date Formatting**: Clear date display with "Today" indicator
- **Loading States**: Visual feedback during data fetching
- **Error Messages**: Clear error handling for better user experience

## 📱 Responsive Design

The app is fully responsive and works seamlessly across:
- Desktop computers
- Tablets
- Mobile phones

## 🔧 Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (not recommended)

## 🌍 Browser Support

Works on all modern browsers including:
- Chrome
- Firefox
- Safari
- Edge

## 📝 Assignment Compliance

This project fulfills the "Weather Now" user persona requirements:
- **User**: Jamie (Outdoor Enthusiast)
- **Need**: Check current weather conditions quickly for any city
- **Technology**: React with Open-Meteo API
- **Features**: City search, weather display, responsive design

## 🤝 Contributing

This is a take-home assignment project. For any questions or improvements, please refer to the assignment guidelines.

## 📄 License

This project is created for educational purposes as part of a take-home challenge.
