// src/modules/weather.js

async function fetchWeather(latitude, longitude) {
    // Use current date to ensure we get the latest forecast, and request hourly data for temperature_2m.
    // Open-Meteo by default provides current day + next 6 days. For 12 hours, it's sufficient.
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error; // Re-throw to be caught by the caller
    }
}

function renderWeather(containerId, weatherData) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Container with id "${containerId}" not found.`);
        return;
    }

    // Clear previous content (loading/error messages)
    container.innerHTML = '';

    if (weatherData && weatherData.hourly && weatherData.hourly.temperature_2m && weatherData.hourly.time) {
        const temperatures = weatherData.hourly.temperature_2m;
        const times = weatherData.hourly.time;

        // We need the next 12 hours. The API returns data starting from the current hour.
        // If the API returns more than 12 hours, slice it. If less, it will use what's available.
        const forecastHours = 12;
        const limitedTemperatures = temperatures.slice(0, forecastHours);
        const limitedTimes = times.slice(0, forecastHours);

        const weatherList = document.createElement('ul');
        weatherList.style.listStyle = 'none'; // Optional: for cleaner appearance
        weatherList.style.padding = '0';

        limitedTimes.forEach((time, index) => {
            const dateTime = new Date(time);
            // Format hours to HH:00
            const hours = dateTime.getHours().toString().padStart(2, '0');
            const temperature = limitedTemperatures[index];

            const listItem = document.createElement('li');
            listItem.textContent = `${hours}:00 — ${temperature}°C`;
            listItem.style.marginBottom = '5px'; // Optional spacing
            weatherList.appendChild(listItem);
        });
        container.appendChild(weatherList);
    } else {
        // Fallback if data structure is unexpected
        container.textContent = 'Could not display weather information.';
    }
}

export function initWeather(containerId) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Weather container with id "${containerId}" not found.`);
        return;
    }

    const kyivLatitude = 50.4501;
    const kyivLongitude = 30.5234;

    // Set loading state
    container.textContent = 'Loading weather...';
    container.style.color = '#888'; // Optional styling for loading text

    fetchWeather(kyivLatitude, kyivLongitude)
        .then(data => {
            renderWeather(containerId, data);
        })
        .catch(error => {
            console.error('Weather module failed to fetch or render:', error);
            // Set error state
            container.textContent = 'Failed to load weather data.';
            container.style.color = 'red'; // Optional styling for error text
        });
}