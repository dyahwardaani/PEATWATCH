Create a modern, professional web-based Early Warning System (EWS) dashboard called "PEATWATCH" for peatland forest and land fire (Karhutla) mitigation.

This website is a real-time IoT monitoring and early warning system based on the following system architecture:

SENSORS
→ Capacitive Soil Moisture Sensor: measures soil moisture
→ DS18B20 Waterproof Sensor: measures soil temperature
→ DHT22 Sensor: measures air temperature and air humidity
→ MQ-2 / MQ-135 Gas/Smoke Sensor: detects gas/smoke levels

All sensor data is sent to an ESP32 microcontroller.

ESP32 processes the sensor data and determines the fire-risk condition.

ESP32 then sends the processed data to the website for real-time monitoring.

The website displays the current environmental condition and risk level.

When the detected condition reaches the Waspada (Warning) or Bahaya (Danger) level, the system sends a notification through a Telegram Bot.

IMPORTANT SYSTEM LOGIC:
1. ESP32 initializes the sensors, Wi-Fi, website connection, and Telegram Bot.
2. Sensors continuously read environmental data.
3. ESP32 processes the sensor data.
4. ESP32 determines the fire-risk level.
5. Normal condition → send data to website and display Normal status.
6. Waspada condition → send data to website, display Waspada status, and send a Telegram notification.
7. Bahaya condition → send data to website, display Bahaya status, and send a Telegram notification.
8. The system waits for the defined monitoring interval and repeats the sensor reading process continuously.
9. Do NOT invent specific sensor threshold values. Display thresholds as configurable system parameters or placeholders that can later be adjusted based on research and testing.

DESIGN STYLE:
- Modern IoT monitoring dashboard
- Professional academic/research prototype
- Environmental monitoring + engineering technology aesthetic
- Clean, minimal, trustworthy, and easy to understand
- Suitable for an undergraduate thesis/project demonstration
- Use dark forest green as the main brand color
- Use off-white/light gray backgrounds
- Use white cards with subtle shadows
- Use rounded corners but keep the interface professional
- Use clear data visualization
- Use green/yellow/orange/red status colors only for risk indicators
- Avoid excessive decoration
- Use Inter or a similar modern sans-serif font
- Desktop-first responsive design
- Main desktop frame: 1440 × 1024 px

BRAND:
Name: PEATWATCH
Subtitle: Peatland Early Warning System
Description: "Sistem Pemantauan dan Peringatan Dini Karhutla pada Lahan Gambut"

Create the following pages:

1. LOGIN PAGE

Create a professional login page for the PEATWATCH system.

Include:
- PEATWATCH logo
- Leaf/peatland-inspired icon
- "Peatland Early Warning System"
- Email input
- Password input
- Remember me checkbox
- Login button
- Clean environmental background
- Minimal and professional appearance

2. DASHBOARD PAGE

This is the main page and should provide a clear overview of the current peatland condition.

Top section:
- PEATWATCH logo
- Search bar
- Notification icon
- User profile
- Current date and time

Left sidebar navigation:
- Dashboard
- Monitoring
- Early Warning
- History Data
- Telegram
- System
- About

Main dashboard content:

A. Overall Risk Status Card
Display a large current system status:
- NORMAL
- WASPADA
- SIAGA
- BAHAYA

Use a large visual status indicator.

IMPORTANT:
The exact threshold values are not defined yet, so do not hard-code scientific threshold numbers. The status should be presented as a configurable result of the ESP32 processing.

B. Sensor Cards

Create four main sensor cards:

1. Soil Moisture
   - Current value
   - Unit: %
   - Status badge
   - Small trend indicator

2. Soil Temperature
   - Current value
   - Unit: °C
   - Status badge
   - Small trend indicator

3. Air Temperature
   - Current value
   - Unit: °C
   - Status badge
   - Small trend indicator

4. Air Humidity
   - Current value
   - Unit: %
   - Status badge
   - Small trend indicator

Also include a Gas/Smoke monitoring card:
- MQ-2 / MQ-135
- Current gas/smoke reading
- Status
- Trend indicator

C. Real-Time Monitoring Chart

Create a large interactive-looking chart showing sensor trends over time.

Provide filters:
- 1 Hour
- 6 Hours
- 24 Hours
- 7 Days

Allow the chart to switch between:
- Soil Moisture
- Soil Temperature
- Air Temperature
- Air Humidity
- Gas/Smoke

D. Recent Activity

Display recent system activities such as:
- System connected
- Sensor data received
- Normal condition detected
- Waspada condition detected
- Telegram notification sent

3. MONITORING PAGE

Create a detailed real-time monitoring page.

Show all sensor parameters in larger cards:

- Capacitive Soil Moisture
- DS18B20 Soil Temperature
- DHT22 Air Temperature
- DHT22 Air Humidity
- MQ-2 / MQ-135 Gas/Smoke

Each card should contain:
- Sensor name
- Sensor type
- Current reading
- Unit
- Current status
- Last update time
- Mini trend graph

Create a large "Real-Time Sensor Data" section.

Show:
"Last updated: [time]"

Create a detailed graph section with selectable sensor parameters.

Create a sensor connection status panel:
- ESP32: Online / Offline
- Wi-Fi: Connected / Disconnected
- Database/Server: Connected / Disconnected
- Last data received

4. EARLY WARNING PAGE

This page should emphasize the early warning function.

Create a large warning status panel.

Possible states:
- NORMAL
- WASPADA
- SIAGA
- BAHAYA

Use:
- Green for Normal
- Yellow for Waspada
- Orange for Siaga
- Red for Bahaya

Create a "Current Condition" section showing the sensor readings that contribute to the current risk status.

Example layout:

Current Risk Status
BAHAYA

Environmental Conditions:
- Soil Moisture
- Soil Temperature
- Air Temperature
- Air Humidity
- Gas/Smoke

Create a "Recommended Action" section.

For example:
- Monitor the area
- Check environmental conditions
- Perform field inspection
- Take mitigation action
- Coordinate with relevant personnel

Do not claim that the system automatically confirms an actual fire. The system should be described as an early warning system based on detected environmental conditions.

Create an "Alert History" table:
- Date
- Time
- Risk level
- Trigger condition
- Telegram notification status

5. HISTORY DATA PAGE

Create a data history page for storing previous sensor readings.

Include:
- Date range filter
- Sensor filter
- Risk status filter
- Search
- Export / Download Data button

Create a table with columns:

Date
Time
Soil Moisture (%)
Soil Temperature (°C)
Air Temperature (°C)
Air Humidity (%)
Gas/Smoke
Risk Status
Telegram Status

Use pagination.

Use status badges:
Normal
Waspada
Siaga
Bahaya

6. TELEGRAM PAGE

Create a page showing the Telegram Bot integration.

Title:
"Telegram Notification"

Show:
- Telegram Bot connection status
- Bot name
- Chat ID
- Notification status
- Last notification
- Connection status

Create a "Notification Rules" section explaining:

Normal:
Website monitoring only.

Waspada:
Website monitoring + Telegram notification.

Bahaya:
Website monitoring + Telegram notification.

Create a Telegram message preview card.

Example:

🚨 PERINGATAN DINI KARHUTLA

Status: WASPADA
Waktu: [date and time]

Kondisi lingkungan menunjukkan
peningkatan risiko kebakaran.

Parameter:
Soil Moisture: [value]
Soil Temperature: [value]
Air Temperature: [value]
Air Humidity: [value]
Gas/Smoke: [value]

Segera lakukan pemeriksaan kondisi area.

Make it visually similar to a Telegram message but do not copy the Telegram application interface.

7. SYSTEM PAGE

Create a system architecture page that visually explains the IoT system.

Show this flow:

Capacitive Soil Moisture Sensor
DS18B20
DHT22
MQ-2 / MQ-135
        ↓
      ESP32
        ↓
Internet / Data Transmission
        ↓
Website
        ↓
Real-Time Monitoring

And separately:

Risk Detection
        ↓
Waspada / Bahaya
        ↓
Telegram Bot Notification

Display device status:
- ESP32 status
- Wi-Fi status
- Sensor connection
- Website/server connection
- Telegram Bot connection

Also provide a simple system architecture diagram using clean icons and arrows.

8. ABOUT PAGE

Create an informative page explaining the purpose of PEATWATCH.

Title:
"About PEATWATCH"

Include:

"What is PEATWATCH?"

PEATWATCH is a web-based Early Warning System designed to monitor environmental conditions on peatlands and provide early warnings for potential forest and land fire risks.

Explain the role of:
- IoT
- ESP32
- Sensors
- Website
- Telegram Bot

Create a simple "How It Works" section:

1. Sensors collect environmental data.
2. ESP32 processes the data.
3. The system determines the risk condition.
4. Website displays real-time monitoring.
5. Telegram sends warnings for Waspada/Bahaya conditions.

NAVIGATION:
Create a consistent left sidebar on all internal pages.

Sidebar:
PEATWATCH
Peatland Early Warning System

Dashboard
Monitoring
Early Warning
History Data
Telegram
System
About

Bottom:
Settings
Logout

INTERACTION / PROTOTYPE:
Create clickable prototype interactions:
- Login → Dashboard
- Dashboard → Monitoring
- Dashboard → Early Warning
- Dashboard → History Data
- Dashboard → Telegram
- Dashboard → System
- Dashboard → About
- Sidebar navigation should work between pages
- Sensor chart filters should look interactive
- Date/filter controls should look interactive
- Notification icon should open a small notification panel
- Risk status cards should have clear visual states

FIGMA STRUCTURE:
Organize the Figma file professionally.

Create:
- Design System
- Colors
- Typography
- Icons
- Components
- Buttons
- Sensor Cards
- Status Badges
- Alert Cards
- Tables
- Navigation
- Charts
- Pages / Screens
- Prototype Flow

Use reusable components and variants for:
- Normal
- Waspada
- Siaga
- Bahaya

IMPORTANT:
The website must visually communicate that this is an IoT-based peatland fire early warning system, not a generic weather dashboard.

The primary focus should be:
1. Real-time sensor monitoring
2. Peatland environmental condition
3. Fire-risk status
4. Early warning
5. Historical sensor data
6. Telegram notification
7. ESP32 and IoT system connectivity

Make the final UI polished, realistic, consistent, and suitable for presentation in an undergraduate thesis.