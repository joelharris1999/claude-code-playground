import { useMemo, useState } from 'react'
import useReveal from '../useReveal.js'

const projects = [
  {
    category: 'web-app',
    tag: 'Web App',
    title: 'Project Alpha',
    description:
      'A real-time collaboration tool built with React and WebSockets. Handles thousands of concurrent users with sub-100ms latency.',
    tech: ['React', 'WebSockets', 'Redis'],
  },
  {
    category: 'api',
    tag: 'API',
    title: 'Data Pipeline',
    description:
      'An event-driven data pipeline processing millions of records daily using Python, Kafka, and PostgreSQL.',
    tech: ['Python', 'Kafka', 'PostgreSQL'],
  },
  {
    category: 'open-source',
    tag: 'Open Source',
    title: 'CLI Toolkit',
    description:
      'A collection of developer tools that automate repetitive tasks. Over 2k stars on GitHub.',
    tech: ['Node.js', 'TypeScript'],
  },
  {
    category: 'web-app',
    tag: 'Web App',
    title: 'Analytics Dashboard',
    description:
      'A customisable analytics dashboard with live charts, alerting, and team workspaces. Used by 500+ companies.',
    tech: ['Next.js', 'D3.js', 'AWS'],
  },
  {
    category: 'mobile',
    tag: 'Mobile',
    title: 'Habit Tracker',
    description:
      'A minimalist habit-tracking app for iOS and Android. Focuses on streaks, weekly reviews, and long-term trends.',
    tech: ['React Native', 'Expo', 'SQLite'],
  },
  {
    category: 'api',
    tag: 'API',
    title: 'Auth Service',
    description:
      'A drop-in authentication microservice supporting OAuth 2.0, SAML, and passkeys. Handles 10M+ requests per day.',
    tech: ['Go', 'OAuth 2.0', 'SAML'],
  },
  {
    category: 'open-source',
    tag: 'Open Source',
    title: 'Schema Sync',
    description:
      'A database schema migration tool that automatically diffs and generates migration files. 500+ GitHub forks.',
    tech: ['Python', 'PostgreSQL', 'MySQL'],
  },
  {
    category: 'mobile',
    tag: 'Mobile',
    title: 'Budget Lens',
    description:
      'Scan receipts with your camera and auto-categorise expenses. Syncs with major banks via open banking APIs.',
    tech: ['Swift', 'Vision', 'Plaid'],
  },
]

const filters = [
  { value: 'all', label: 'All' },
  { value: 'web-app', label: 'Web App' },
  { value: 'api', label: 'API' },
  { value: 'open-source', label: 'Open Source' },
  { value: 'mobile', label: 'Mobile' },
]

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('all')
  const containerRef = useReveal()

  const visibleProjects = useMemo(
    () => (activeFilter === 'all' ? projects : projects.filter(p => p.category === activeFilter)),
    [activeFilter]
  )

  return (
    <div ref={containerRef}>
      <section className="page-hero section">
        <div className="container">
          <h1 className="page-title">Projects</h1>
          <p className="page-subtitle">
            A selection of things I've built — personal projects, open-source work, and client work.
          </p>
        </div>
      </section>

      <section className="section section-alt reveal">
        <div className="container">
          <div className="filter-bar" role="group" aria-label="Filter projects by category">
            {filters.map(f => (
              <button
                key={f.value}
                className={`filter-btn${activeFilter === f.value ? ' active' : ''}`}
                onClick={() => setActiveFilter(f.value)}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="cards">
            {visibleProjects.map(project => (
              <article className="card" key={project.title}>
                <div className="card-tag">{project.tag}</div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="card-tech">
                  {project.tech.map(t => (
                    <span className="skill-tag" key={t}>{t}</span>
                  ))}
                </div>
                <a href="#" className="card-link">View project →</a>
              </article>
            ))}
          </div>

          {visibleProjects.length === 0 && (
            <p className="no-results">No projects in this category yet.</p>
          )}
        </div>
      </section>
    </div>
  )
}
