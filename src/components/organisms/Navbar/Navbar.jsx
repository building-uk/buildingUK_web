import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import NavLink from '@molecules/NavLink'
import Button from '@atoms/Button'
import { cmsService } from '@/services/cmsService'
import './Navbar.css'

/**
 * Navbar organism - Main navigation header
 * @param {Object} props
 * @param {boolean} props.transparent - Transparent background mode
 */
function Navbar({ transparent = true }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [companyInfo, setCompanyInfo] = useState(null)
  const [navLinks, setNavLinks] = useState([
    { to: '/', label: 'Home' },
    { to: '/about', label: 'Company' },
    { to: '/services', label: 'Services' },
    { to: '/projects', label: 'Projects' },
    { to: '/articles', label: 'Articles' },
  ])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [settings, links] = await Promise.all([
          cmsService.getSiteSettings(),
          cmsService.getNavigation()
        ])

        if (settings) {
          setCompanyInfo({
            name: 'BuildingUK',
            logo: settings.logo || '/images/BuildingUK-Footer.png'
          })
        }

        if (links) {
          setNavLinks(links)
        }
      } catch (error) {
        console.error('Error fetching navbar data:', error)
        setCompanyInfo({ name: 'BuildingUK', logo: '/images/DSC_6758.JPG' })
      }
    }
    fetchData()
  }, [])

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <header className={`navbar ${transparent ? 'navbar--transparent' : ''}`}>
      <div className="navbar__container container">
        <Link to="/" className="navbar__logo">
          {companyInfo?.logo ? (
            <img src={companyInfo.logo} alt={companyInfo.name || "BuildingUK"} />
          ) : (
            <div className="navbar__logo-placeholder">BuildingUK</div>
          )}
        </Link>

        <button
          className="navbar__toggle"
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <span className="navbar__toggle-bar"></span>
          <span className="navbar__toggle-bar"></span>
          <span className="navbar__toggle-bar"></span>
        </button>

        <nav className={`navbar__nav ${isMenuOpen ? 'navbar__nav--open' : ''}`}>
          <ul className="navbar__links">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink to={link.to} variant="light">
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <Button href="/contact" variant="primary" size="md">
            Contact Us
          </Button>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
