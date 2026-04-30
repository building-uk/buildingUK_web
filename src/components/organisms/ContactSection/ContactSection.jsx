import { useState } from 'react'
import Label from '@atoms/Label'
import Heading from '@atoms/Heading'
import Text from '@atoms/Text'
import Input from '@atoms/Input'
import Button from '@atoms/Button'
import Skeleton from '@atoms/Skeleton'
import ContactInfo from '@molecules/ContactInfo'
import { cmsService } from '../../../services/cmsService'
import './ContactSection.css'

/**
 * ContactSection organism - Contact form and info section
 * @param {Object} props
 * @param {Object} props.contactData - Contact information data
 * @param {boolean} props.loading - Loading state
 */
function ContactSection({ contactData = {}, loading = false }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [formState, setFormState] = useState({
    submitting: false,
    error: null,
    success: false
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormState({ submitting: true, error: null, success: false })

    try {
      await cmsService.submitContactForm(formData)
      setFormState({ submitting: false, error: null, success: true })
      setFormData({ name: '', email: '', message: '' })
      setTimeout(() => setFormState(prev => ({ ...prev, success: false })), 5000)
    } catch (error) {
      setFormState({ submitting: false, error: error.message, success: false })
    }
  }

  const {
    address = {},
    contact = {},
    intro = {
      label: 'Contact Us',
      headline: 'Start the conversation'
    }
  } = contactData || {}

  if (loading) {
    return (
      <section id="contact" className="contact section section--primary">
        <div className="contact__container container">
          <div className="contact__left">
            <Skeleton variant="text" width="100px" />
            <Skeleton variant="heading" width="280px" height="40px" />
            <div className="contact__form-skeleton">
              <Skeleton height="50px" />
              <Skeleton height="50px" />
              <Skeleton height="150px" />
              <Skeleton variant="button" width="150px" />
            </div>
          </div>

          <div className="contact__right">
            <Skeleton variant="image" height="300px" />
            <div className="contact__info-skeleton">
              <Skeleton variant="text" lines={2} />
              <Skeleton variant="text" lines={2} />
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="contact" className="contact section section--primary">
      <div className="contact__container container">
        {/* Left side - Form */}
        <div className="contact__left">
          <Label color="dark">{intro.label}</Label>
          <Heading level={2} variant="section" color="dark">
            {intro.headline}
          </Heading>

          {formState.success && (
            <div className="form-alert form-alert--success">
              Thank you! We'll be in touch soon.
            </div>
          )}

          {formState.error && (
            <div className="form-alert form-alert--error">
              {formState.error}
            </div>
          )}

          <form className="contact__form" onSubmit={handleSubmit}>
            <Input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={formState.submitting}
            />
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={formState.submitting}
            />
            <Input
              type="textarea"
              name="message"
              placeholder="Write message"
              value={formData.message}
              onChange={handleChange}
              rows={6}
              required
              disabled={formState.submitting}
            />
            <Button
              type="submit"
              variant="secondary"
              size="md"
              disabled={formState.submitting}
            >
              {formState.submitting ? 'Sending...' : 'Request a Call'}
            </Button>
          </form>
        </div>

        {/* Right side - Image + Info */}
        <div className="contact__right">
          <a
            href="https://www.google.com/maps/place/18+Spring+St,+London+W2+3RA,+UK"
            target="_blank"
            rel="noopener noreferrer"
            className="contact__map-link"
            aria-label="Open office location in Google Maps"
          >
            <div className="contact__image">
              <iframe
                title="BuildingUK Office Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2482.5!2d-0.176!3d51.516!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761ab2a7b8e1a1%3A0x2f8b5c9c9c9c9c9c!2s18+Spring+St%2C+London+W2+3RA%2C+UK!5e0!3m2!1sen!2suk!4v1713400000000"
                width="100%"
                height="100%"
                style={{ border: 0, pointerEvents: 'none' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </a>

          <div className="contact__info">
            <ContactInfo
              title="Location"
              lines={address?.lines || ['18 Spring Street', 'London, W2 3RA']}
            />
            <ContactInfo
              title="Contact Us"
              lines={contact?.lines || ['0787 920 8628', 'info@building.uk.com']}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
