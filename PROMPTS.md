\# PROMPTS.md



Цей файл містить всі основні промпти, які використовувались у Gemini CLI

під час міграції Planner Dashboard з Google Apps Script у PWA

(Vite + Vanilla JS).



---



\## 1. Аналіз репозиторію та план міграції



Проаналізуй цей Vite + Vanilla JS репозиторій.

Запропонуй структуру planner dashboard з модулями:

clock, weather, events.

Опиши порядок реалізації на перше заняття (1–2 години).



---



\## 2. Створення базової структури проєкту



Зроби зміни в репозиторії:

\- Створи директорію `src/modules`

\- Додай файли `clock.js`, `weather.js`, `events.js`

\- Створи `src/styles/main.css`

\- Онови `index.html`, щоб додати секції:

&nbsp; Clock (`#clock-container`),

&nbsp; Weather (`#weather-container`),

&nbsp; Events (`#events-container`)

\- Підключи стилі через `src/main.js`

\- Прибери або не використовуй `counter.js`



---



\## 3. Реалізація live clock модуля



Реалізуй модуль `src/modules/clock.js`:

\- функція `initClock(containerId)`

\- відображай час у форматі HH:MM:SS

\- оновлюй щосекунди через `setInterval`

\- додай обробку помилки, якщо контейнер не знайдено



Підключи `initClock('clock-container')` у `src/main.js`

та додай базові стилі для віджета.



---



\## 4. Реалізація weather модуля (Open-Meteo)



Реалізуй weather модуль через Open-Meteo (без API key):

\- файл `src/modules/weather.js`

\- координати Києва: lat 50.4501, lon 30.5234

\- отримай погодинний прогноз `temperature\_2m` на 12 годин

\- відрендери список у `#weather-container`

&nbsp; у форматі: `HH:00 — XX°C`

\- додай стани loading та error

\- підключи `initWeather('weather-container')` у `src/main.js`



---



\## 5. Events модуль (Track A — static events.json)



Зроби Events модуль (Track A) для Planner Dashboard.



Вимоги:

\- Створи файл `public/events.json` з 5–7 прикладними подіями

&nbsp; на найближчі дні.



Формат події:

{

&nbsp; "id": "string",

&nbsp; "title": "string",

&nbsp; "start": "YYYY-MM-DDTHH:mm",

&nbsp; "end": "YYYY-MM-DDTHH:mm",

&nbsp; "location": "string (optional)"

}



\- Реалізуй `src/modules/events.js` з функцією `initEvents(containerId)`:

&nbsp; - fetch даних з `/events.json`

&nbsp; - відобрази список подій у контейнері `#events-container`

&nbsp; - формат рендера:

&nbsp;   Дата → Назва → Час (start–end)

&nbsp; - додай стани loading та error



\- Підключи `initEvents('events-container')` у `src/main.js`



\- Якщо подій немає — показати повідомлення

&nbsp; "No upcoming events"



Код має бути простий, читабельний, без використання фреймворків.



---



\## 6. PWA підтримка



Додай PWA можливості до проєкту:

\- Web App Manifest (name, icons, theme\_color)

\- Service Worker з offline cache

\- Перевір installability у Chrome DevTools

\- Підготуй проєкт до деплою (GitHub Pages / Netlify)



