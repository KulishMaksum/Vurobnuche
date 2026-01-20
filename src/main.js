import './styles/main.css';

import { initClock } from './modules/clock.js';
import { initWeather } from './modules/weather.js';
// Import the events module initialization function
import { initEvents } from './modules/events.js';

// Initialize modules when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  initClock('clock-container');
  initWeather('weather-container');
  // Initialize the events module
  initEvents('events-container');
});
