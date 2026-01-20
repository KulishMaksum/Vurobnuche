// src/modules/events.js

// Helper function to format date and time
const formatEventDate = (dateString) => {
    const date = new Date(dateString);
    // Get day of the week, e.g., "Tue"
    const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'short' });
    // Get date in YYYY-MM-DD format
    const formattedDate = date.toISOString().split('T')[0];
    return `${formattedDate} (${dayOfWeek})`;
};

const formatEventTime = (startString, endString) => {
    const startDate = new Date(startString);
    const endDate = new Date(endString);

    const formatTime = (date) => {
        let hours = date.getHours();
        let minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        return `${hours}:${minutes} ${ampm}`;
    };

    const formattedStartTime = formatTime(startDate);
    const formattedEndTime = formatTime(endDate);

    // If start and end times are the same, just show the start time
    if (startDate.getTime() === endDate.getTime()) {
        return formattedStartTime;
    }

    return `${formattedStartTime} - ${formattedEndTime}`;
};

/**
 * Initializes the events module.
 * Fetches events from /events.json and renders them in the specified container.
 * Handles loading and error states.
 * @param {string} containerId The ID of the HTML element to render events into.
 */
export const initEvents = (containerId) => {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Events container element with ID "${containerId}" not found.`);
        return;
    }

    // Show loading state
    container.innerHTML = '<div class="loading-events">Loading events...</div>';

    fetch('/events.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(events => {
            // Clear loading state
            container.innerHTML = '';

            if (!events || events.length === 0) {
                container.innerHTML = '<div class="no-events">No upcoming events</div>';
                return;
            }

            const eventList = document.createElement('ul');
            eventList.className = 'event-list'; // Add a class for potential styling

            events.forEach(event => {
                const listItem = document.createElement('li');
                listItem.className = 'event-item'; // Add a class for potential styling

                const formattedDate = formatEventDate(event.start);
                const formattedTime = formatEventTime(event.start, event.end);

                // Construct the HTML for each event
                listItem.innerHTML = `
                    <div class="event-date-title-time">
                        <span class="event-date">${formattedDate}</span>
                        <span class="event-separator">→</span>
                        <span class="event-title">${event.title}</span>
                        <span class="event-separator">→</span>
                        <span class="event-time">${formattedTime}</span>
                    </div>
                    ${event.location ? `<div class="event-location">Location: ${event.location}</div>` : ''}
                `;
                eventList.appendChild(listItem);
            });

            container.appendChild(eventList);
        })
        .catch(error => {
            console.error('Error fetching or rendering events:', error);
            // Clear loading state and show error
            container.innerHTML = `<div class="error-events">Failed to load events: ${error.message}</div>`;
        });
};