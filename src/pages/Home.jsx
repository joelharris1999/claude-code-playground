import { Link } from 'react-router-dom'
import useReveal from '../useReveal.js'

const featured = [
  {
    tag: 'Web App',
    title: 'Project Alpha',
    description:
      'A real-time collaboration tool built with React and WebSockets. Handles thousands of concurrent users with sub-100ms latency.',
  },
  {
    tag: 'API',
    title: 'Data Pipeline',
    description:
      'An event-driven data pipeline processing millions of records daily using Python, Kafka, and PostgreSQL.',
  },
  {
    tag: 'Open Source',
    title: 'CLI Toolkit',
    description:
      'A collection of developer tools that automate repetitive tasks. Over 2k stars on GitHub.',
  },
]

const skills = ['TypeScript', 'React', 'Node.js', 'Python', 'PostgreSQL', 'AWS']

export default function Home() {
  const containerRef = useReveal()

  return (
    <div ref={containerRef}>
      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow">Hello, I'm</p>
          <h1>Joel Harris</h1>
          <p className="tagline">Software developer building clean, thoughtful products.</p>
          <div className="hero-actions">
            <Link to="/projects" className="btn btn-primary">See my work</Link>
            <Link to="/contact" className="btn btn-secondary">Get in touch</Link>
          </div>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <div className="avatar">JH</div>
        </div>
      </section>

      <section id="about" className="section reveal">
        <div className="container">
          <h2 className="section-title">About me</h2>
          <div className="about-grid">
            <p>
              I'm a full-stack developer with a passion for building products that are fast, accessible, and
              easy to use. I care deeply about the details — both in code and in design.
            </p>
            <p>
              When I'm not writing code, you'll find me reading, running, or tinkering with side projects.
              I'm always looking for interesting problems to solve.
            </p>
          </div>
          <div className="skills">
            {skills.map(skill => (
              <span className="skill-tag" key={skill}>{skill}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt reveal">
        <div className="container">
          <h2 className="section-title">Featured work</h2>
          <div className="cards">
            {featured.map(project => (
              <article className="card reveal" key={project.title}>
                <div className="card-tag">{project.tag}</div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <Link to="/projects" className="card-link">View all projects →</Link>
              </article>
            ))}
          </div>
          <div style={{ marginTop: '2rem', textAlign: 'center' }}>
            <Link to="/projects" className="btn btn-secondary">View all projects</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
