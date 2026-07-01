import { useState } from 'react'
import useReveal from '../useReveal.js'

const emptyForm = { name: '', email: '', subject: '', message: '' }

const validators = {
  name: val => val.trim().length > 0,
  email: val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim()),
  subject: val => val.trim().length > 0,
  message: val => val.trim().length > 0,
}

const errorMessages = {
  name: 'Please enter your name.',
  email: 'Please enter a valid email.',
  subject: 'Please enter a subject.',
  message: 'Please enter a message.',
}

export default function Contact() {
  const containerRef = useReveal()
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const handleChange = (field) => (e) => {
    setForm(f => ({ ...f, [field]: e.target.value }))
    setErrors(er => ({ ...er, [field]: undefined }))
  }

  const validate = () => {
    const nextErrors = {}
    for (const field of Object.keys(validators)) {
      if (!validators[field](form[field])) {
        nextErrors[field] = errorMessages[field]
      }
    }
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setSending(true)
    // Simulate network delay (replace with real fetch in production)
    await new Promise(r => setTimeout(r, 1200))
    setSending(false)
    setSent(true)
  }

  return (
    <div ref={containerRef}>
      <section className="page-hero section">
        <div className="container">
          <h1 className="page-title">Get in touch</h1>
          <p className="page-subtitle">
            I'm open to new opportunities, collaborations, and interesting conversations. Fill in the form
            or reach out directly.
          </p>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container contact-layout">
          <div className="contact-info reveal">
            <h2 className="section-title">Let's talk</h2>
            <p className="text-muted">
              Whether you have a project in mind, a question, or just want to say hello — I'd love to hear
              from you. I typically reply within 24 hours.
            </p>

            <ul className="contact-details">
              <li>
                <span className="contact-label">Email</span>
                <a href="mailto:joel.harris@proximagroup.com">joel.harris@proximagroup.com</a>
              </li>
              <li>
                <span className="contact-label">Based in</span>
                <span>London, UK</span>
              </li>
              <li>
                <span className="contact-label">Availability</span>
                <span className="availability-badge">Open to work</span>
              </li>
            </ul>

            <div className="social-links-left">
              <a href="#" aria-label="GitHub">GitHub</a>
              <a href="#" aria-label="LinkedIn">LinkedIn</a>
              <a href="#" aria-label="Twitter">Twitter</a>
            </div>
          </div>

          <div className="contact-form-wrap reveal">
            {!sent ? (
              <form onSubmit={handleSubmit} noValidate>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Your name"
                    autoComplete="name"
                    className={errors.name ? 'invalid' : undefined}
                    value={form.name}
                    onChange={handleChange('name')}
                  />
                  <span className="field-error">{errors.name}</span>
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    className={errors.email ? 'invalid' : undefined}
                    value={form.email}
                    onChange={handleChange('email')}
                  />
                  <span className="field-error">{errors.email}</span>
                </div>
                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    placeholder="What's this about?"
                    className={errors.subject ? 'invalid' : undefined}
                    value={form.subject}
                    onChange={handleChange('subject')}
                  />
                  <span className="field-error">{errors.subject}</span>
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    rows={6}
                    placeholder="Tell me about your project or idea…"
                    className={errors.message ? 'invalid' : undefined}
                    value={form.message}
                    onChange={handleChange('message')}
                  />
                  <span className="field-error">{errors.message}</span>
                </div>
                <button type="submit" className="btn btn-primary btn-full" disabled={sending}>
                  {sending ? 'Sending…' : 'Send message'}
                </button>
              </form>
            ) : (
              <div className="form-success">
                <div className="success-icon">✓</div>
                <h3>Message sent!</h3>
                <p>Thanks for reaching out. I'll get back to you within 24 hours.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
