import { useState } from 'react'
import { NavLink } from 'react-router-dom'

export default function Navbar({ theme, toggleTheme }) {
  const [open, setOpen] = useState(false)

  const linkClass = ({ isActive }) => (isActive ? 'nav-active' : undefined)

  return (
    <header className="site-header">
      <nav className="nav-inner">
        <NavLink to="/" className="logo" onClick={() => setOpen(false)}>
          JH
        </NavLink>

        <button
          className="nav-burger"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen(o => !o)}
        >
          <span></span><span></span><span></span>
        </button>

        <ul className={`nav-links${open ? ' open' : ''}`}>
          <li><NavLink to="/" className={linkClass} onClick={() => setOpen(false)}>Home</NavLink></li>
          <li><NavLink to="/projects" className={linkClass} onClick={() => setOpen(false)}>Projects</NavLink></li>
          <li><NavLink to="/contact" className={linkClass} onClick={() => setOpen(false)}>Contact</NavLink></li>
        </ul>

        <button id="theme-toggle" aria-label="Toggle dark/light mode" onClick={toggleTheme}>
          <span className="icon-sun">☀️</span>
          <span className="icon-moon">🌙</span>
        </button>
      </nav>
    </header>
  )
}
