// src/modules/clock.js

export function initClock(containerId) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Container element with id "${containerId}" not found.`);
    return;
  }

  function updateTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    container.textContent = `${hours}:${minutes}:${seconds}`;
  }

  updateTime(); // Initial call
  setInterval(updateTime, 1000);
}
