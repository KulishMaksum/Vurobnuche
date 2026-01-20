// src/modules/weather.js
export function initWeather(containerId) {
  const container = document.getElementById(containerId);
  if (container) {
    container.innerHTML = '<p>Weather module placeholder</p>';
  }
  console.log('Weather module initialized');
}
