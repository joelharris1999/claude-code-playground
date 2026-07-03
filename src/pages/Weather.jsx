import useReveal from '../useReveal.js'
import weatherLogRaw from '../../weather-log.md?raw'

const ENTRY_PATTERN =
  /## (?<date>\d{4}-\d{2}-\d{2})\s*\n- \*\*Temperature:\*\* (?<temperature>[^\n(]+?)\s*\(low (?<low>[^\n/]+?) \/ high (?<high>[^\n)]+?)\)\s*\n(?:- \*\*Humidity:\*\* (?<humidity>[^\n]+)\s*\n)?(?:- \*\*Wind Speed:\*\* (?<wind>[^\n]+)\s*\n)?- \*\*Summary:\*\* (?<summary>.+)/g

function parseWeatherLog(raw) {
  const entries = [...raw.matchAll(ENTRY_PATTERN)].map(match => ({ ...match.groups }))
  // Newest first
  return entries.reverse()
}

function formatDate(isoDate) {
  return new Date(`${isoDate}T00:00:00`).toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default function Weather() {
  const containerRef = useReveal()
  const entries = parseWeatherLog(weatherLogRaw)

  return (
    <div ref={containerRef}>
      <section className="page-hero section">
        <div className="container">
          <h1 className="page-title">Weather Log</h1>
          <p className="page-subtitle">
            London's daily forecast, fetched automatically every morning from{' '}
            <a href="https://open-meteo.com/" target="_blank" rel="noreferrer">Open-Meteo</a> and
            logged here by a scheduled GitHub Actions workflow.
          </p>
        </div>
      </section>

      <section className="section section-alt reveal">
        <div className="container">
          {entries.length === 0 ? (
            <p className="no-results">No entries logged yet — check back after tomorrow's run.</p>
          ) : (
            <div className="cards">
              {entries.map(entry => (
                <article className="card" key={entry.date}>
                  <div className="card-tag">{formatDate(entry.date)}</div>
                  <h3>{entry.temperature}</h3>
                  <p>{entry.summary}</p>
                  <div className="card-tech">
                    <span className="skill-tag">Low {entry.low}</span>
                    <span className="skill-tag">High {entry.high}</span>
                    {entry.humidity && <span className="skill-tag">Humidity {entry.humidity}</span>}
                    {entry.wind && <span className="skill-tag">Wind {entry.wind}</span>}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
