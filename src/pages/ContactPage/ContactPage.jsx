import { useEffect, useState } from 'react'
import Navbar from '@organisms/Navbar'
import PageHero from '@organisms/PageHero'
import FaqSection from '@organisms/FaqSection'
import Footer from '@organisms/Footer'
import Heading from '@atoms/Heading'
import Text from '@atoms/Text'
import Input from '@atoms/Input'
import Button from '@atoms/Button'
import Icon from '@atoms/Icon'
import Image from '@atoms/Image'
import { cmsService } from '../../services/cmsService'
import { useFormValidation, validators } from '../../hooks'
import { usePageTitle } from '../../hooks'
import './ContactPage.css'

const contactFormRules = {
  name: [validators.required, validators.minLength(2)],
  email: [validators.required, validators.email],
  message: [validators.required, validators.minLength(10)]
}

/**
 * ContactPage - Contact Us page
 */
function ContactPage() {
  usePageTitle('Contact Us')

  const [data, setData] = useState({
    contact: null
  })
  const [loading, setLoading] = useState(true)

  // Form validation hook
  const {
    getFieldProps,
    handleSubmit,
    isSubmitting,
    submitError,
    submitSuccess,
    reset
  } = useFormValidation(
    { name: '', email: '', message: '' },
    contactFormRules,
    async (formData) => {
      // Send to CMS/API
      const response = await cmsService.submitContactForm(formData)
      return response
    }
  )

  useEffect(() => {
    const fetchData = async () => {
      try {
        const contact = await cmsService.getContactInfo()
        setData({ contact })
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="loading">
        <div className="loading__spinner"></div>
      </div>
    )
  }

  const { contact, address, mapImage, heroImage, sideImage } = data.contact || {}

  return (
    <div className="contact-page">
      <Navbar />

      <main>
        <PageHero
          title="Contact Us"
          backgroundImage={heroImage || "/images/contact-hero-bg.jpg"}
        />

        {/* Contact Split Section */}
        <section className="contact-split section">
          <div className="container contact-split__container">
            {/* Left Column: Get in Touch */}
            <div className="contact-split__info">
              <Heading level={2} variant="section">Get in touch</Heading>

              <Text size="base" color="dark" className="contact-split__desc">
                Have a project in mind or need more information? Our team is here to help. Whether you're planning a renovation, refurbishment, or simply exploring your options, we'll provide clear guidance and a prompt, professional response.
              </Text>

              <div className="contact-split__details">
                <div className="contact-detail-item">
                  <span className="contact-icon wrapper">
                    <Icon name="mapPin" size={24} />
                  </span>
                  <div>
                    <strong className="contact-label">Address</strong>
                    {address?.lines?.map((line, i) => (
                      <Text key={i} size="sm" color="dark">{line}</Text>
                    )) || <Text size="sm" color="dark">5th Floor, 167-169 Great Portland Street, London W1W 5PF</Text>}
                  </div>
                </div>

                <div className="contact-detail-item">
                  <span className="contact-icon wrapper">
                    <Icon name="phone" size={24} />
                  </span>
                  <div>
                    <strong className="contact-label">Phone Number</strong>
                    <Text size="sm" color="dark">{contact?.lines?.[0] || '+44 787 920 8628'}</Text>
                  </div>
                </div>

                <div className="contact-detail-item">
                  <span className="contact-icon wrapper">
                    <Icon name="mail" size={24} />
                  </span>
                  <div>
                    <strong className="contact-label">E-mail</strong>
                    <Text size="sm" color="dark">{contact?.lines?.[1] || 'info@building.uk.com'}</Text>
                  </div>
                </div>
              </div>

              <div className="contact-split__social">
                <strong className="contact-label-social">FOLLOW US</strong>
                <div className="social-icons">
                  {data.contact?.social?.map((social, i) => (
                    <a
                      key={i}
                      href={social.url}
                      className="social-icon"
                      aria-label={social.platform}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Icon name={social.platform.toLowerCase()} size={24} />
                    </a>
                  )) || (
                      <>
                        <a href="https://instagram.com" className="social-icon" aria-label="Instagram">
                          <Icon name="instagram" size={24} />
                        </a>
                        <a href="https://linkedin.com" className="social-icon" aria-label="LinkedIn">
                          <Icon name="linkedin" size={24} />
                        </a>
                      </>
                    )}
                </div>
              </div>
            </div>

            {/* Right Column: Form */}
            <div className="contact-split__form-wrapper">
              <Heading level={2} variant="section">Send us a message</Heading>

              {submitSuccess && (
                <div className="form-alert form-alert--success">
                  <Icon name="check" size={20} />
                  <span>Message sent successfully! We'll be in touch soon.</span>
                </div>
              )}

              {submitError && (
                <div className="form-alert form-alert--error">
                  <Icon name="alert" size={20} />
                  <span>{submitError}</span>
                </div>
              )}

              <form className="contact-split__form" onSubmit={handleSubmit} noValidate>
                <Input
                  {...getFieldProps('name')}
                  placeholder="Your Name"
                  disabled={isSubmitting}
                />
                <Input
                  {...getFieldProps('email')}
                  type="email"
                  placeholder="Your Email"
                  disabled={isSubmitting}
                />
                <Input
                  {...getFieldProps('message')}
                  type="textarea"
                  placeholder="Your Message"
                  rows={6}
                  disabled={isSubmitting}
                />

                <div className="contact-split__submit">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'SENDING...' : 'REQUEST A CALL'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* Full Width Map */}
        <section className="contact-map">
          <Image src={mapImage || "/images/contact-map-full.jpg"} alt="Our Location" />
        </section>

        <FaqSection />
      </main>

      <Footer />
    </div>
  )
}

export default ContactPage
