import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Projects from './pages/Projects.jsx'
import Weather from './pages/Weather.jsx'
import Contact from './pages/Contact.jsx'
import useTheme from './useTheme.js'

export default function App() {
  const { theme, toggleTheme } = useTheme()

  return (
    <>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
