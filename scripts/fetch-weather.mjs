// Fetches today's London forecast from Open-Meteo (no API key required)
// and appends a dated entry to weather-log.md.
import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const LATITUDE = 51.5074
const LONGITUDE = -0.1278
const LOG_PATH = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
  'weather-log.md'
)

// WMO weather interpretation codes, as used by Open-Meteo.
const WEATHER_CODES = {
  0: 'Clear sky',
  1: 'Mainly clear',
  2: 'Partly cloudy',
  3: 'Overcast',
  45: 'Fog',
  48: 'Depositing rime fog',
  51: 'Light drizzle',
  53: 'Moderate drizzle',
  55: 'Dense drizzle',
  56: 'Light freezing drizzle',
  57: 'Dense freezing drizzle',
  61: 'Slight rain',
  63: 'Moderate rain',
  65: 'Heavy rain',
  66: 'Light freezing rain',
  67: 'Heavy freezing rain',
  71: 'Slight snow fall',
  73: 'Moderate snow fall',
  75: 'Heavy snow fall',
  77: 'Snow grains',
  80: 'Slight rain showers',
  81: 'Moderate rain showers',
  82: 'Violent rain showers',
  85: 'Slight snow showers',
  86: 'Heavy snow showers',
  95: 'Thunderstorm',
  96: 'Thunderstorm with slight hail',
  99: 'Thunderstorm with heavy hail',
}

function describeWeatherCode(code) {
  return WEATHER_CODES[code] ?? `Unknown conditions (code ${code})`
}

async function fetchForecast() {
  const url = new URL('https://api.open-meteo.com/v1/forecast')
  url.searchParams.set('latitude', LATITUDE)
  url.searchParams.set('longitude', LONGITUDE)
  url.searchParams.set('current', 'temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code')
  url.searchParams.set('daily', 'temperature_2m_max,temperature_2m_min,weather_code')
  url.searchParams.set('timezone', 'Europe/London')

  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`Open-Meteo request failed: ${res.status} ${res.statusText}`)
  }
  return res.json()
}

async function loadExistingLog() {
  try {
    return await readFile(LOG_PATH, 'utf8')
  } catch (err) {
    if (err.code === 'ENOENT') {
      return '# Weather Log\n\nDaily London weather, fetched automatically each morning from [Open-Meteo](https://open-meteo.com/).\n'
    }
    throw err
  }
}

async function main() {
  const data = await fetchForecast()

  const date = data.daily.time[0]
  const currentTemp = data.current.temperature_2m
  const currentUnit = data.current_units.temperature_2m
  const high = data.daily.temperature_2m_max[0]
  const low = data.daily.temperature_2m_min[0]
  const humidity = data.current.relative_humidity_2m
  const humidityUnit = data.current_units.relative_humidity_2m
  const windSpeed = data.current.wind_speed_10m
  const windUnit = data.current_units.wind_speed_10m
  const summary = describeWeatherCode(data.current.weather_code)

  const existingLog = await loadExistingLog()

  if (existingLog.includes(`\n## ${date}\n`)) {
    console.log(`Entry for ${date} already present — skipping.`)
    return
  }

  const entry = [
    `\n## ${date}`,
    `- **Temperature:** ${currentTemp}${currentUnit} (low ${low}${currentUnit} / high ${high}${currentUnit})`,
    `- **Humidity:** ${humidity}${humidityUnit}`,
    `- **Wind Speed:** ${windSpeed}${windUnit}`,
    `- **Summary:** ${summary}`,
    '',
  ].join('\n')

  await writeFile(LOG_PATH, existingLog.trimEnd() + '\n' + entry)
  console.log(`Appended weather entry for ${date}.`)
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
