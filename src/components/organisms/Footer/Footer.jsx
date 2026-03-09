import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from '@atoms/Icon'
import { cmsService } from '@/services/cmsService'
import './Footer.css'

/**
 * Footer organism - Site footer with newsletter
 */
function Footer() {
  const currentYear = new Date().getFullYear()
  const [companyInfo, setCompanyInfo] = useState(null)
  const [footerData, setFooterData] = useState({
    links: [
      { to: '/', label: 'Home' },
      { to: '/about', label: 'Company' },
      { to: '/services', label: 'Services' },
      { to: '/projects', label: 'Projects' },
      { to: '/articles', label: 'Blog' },
      { to: '/contact', label: 'Contact Us' },
    ],
    infoLinks: [
      { to: '/terms', label: 'Terms and conditions' },
      { to: '/privacy', label: 'Privacy Policy' },
      { to: '/health-safety', label: 'Health & Safety' },
    ],
    contact: {
      email: 'info@building.uk.com',
      social: [
        { platform: 'Instagram', url: 'https://instagram.com' },
        { platform: 'LinkedIn', url: 'https://linkedin.com' }
      ]
    }
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [settings, links, contact] = await Promise.all([
          cmsService.getSiteSettings(),
          cmsService.getFooterLinks(),
          cmsService.getContactInfo()
        ])

        if (settings) {
          setCompanyInfo({
            name: 'BuildingUK',
            logo: settings.logo || '/images/BuildingUK-Footer.png',
            tagline: settings.tagline || 'Leading the way in sustainable construction and innovative architectural solutions across the UK.'
          })
        }

        if (links) {
          setFooterData(prev => ({
            ...prev,
            links: links.main,
            infoLinks: links.info
          }))
        }

        if (contact) {
          setFooterData(prev => ({
            ...prev,
            contact: {
              email: contact.contact?.lines?.[1] || 'info@building.uk.com',
              social: contact.social
            }
          }))
        }
      } catch (error) {
        console.error('Error fetching footer data:', error)
        setCompanyInfo({
          name: 'BuildingUK',
          tagline: 'Leading the way in sustainable construction and innovative architectural solutions across the UK.'
        })
      }
    }
    fetchData()
  }, [])

  return (
    <footer className="footer section--dark">
      <div className="footer__container container">
        {/* Logo and description */}
        <div className="footer__brand">
          <Link to="/" className="footer__logo">
            {companyInfo?.logo ? (
              <img src={companyInfo.logo} alt={companyInfo.name || "BuildingUK"} />
            ) : (
              <div className="navbar__logo-placeholder">BuildingUK</div>
            )}
          </Link>
          <p className="footer__description">
            {companyInfo?.tagline || "Leading the way in sustainable construction and innovative architectural solutions across the UK."}
          </p>

          {/* Contact */}
          <div className="footer__social">
            <span className="footer__social-label">Contact Us</span>
            <div className="footer__social-icons">
              {footerData.contact.social.map((social, i) => (
                <a
                  key={i}
                  href={social.url}
                  aria-label={social.platform}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon name={social.platform.toLowerCase()} size={20} />
                </a>
              ))}
              <a href={`mailto:${footerData.contact.email}`} aria-label="Email">
                <Icon name="mail" size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="footer__links">
          <span className="footer__heading">Links</span>
          <ul>
            {footerData.links.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="footer__link">{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Information */}
        <div className="footer__info">
          <span className="footer__heading">Information</span>
          <ul>
            {footerData.infoLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="footer__link">{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="footer__bottom container">
        <span className="footer__copyright">
          {currentYear} All rights reserved
        </span>
      </div>
    </footer >
  )
}

export default Footer
