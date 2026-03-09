import { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import Navbar from '@organisms/Navbar'
import Footer from '@organisms/Footer'
import Heading from '@atoms/Heading'
import Text from '@atoms/Text'
import Image from '@atoms/Image'
import { cmsService } from '../../services/cmsService'
import './ServiceDetailPage.css'

/**
 * ServiceDetailPage - Individual service detail page
 */
function ServiceDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [service, setService] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const serviceData = await cmsService.getServiceById(id)

        if (!serviceData) {
          navigate('/services')
          return
        }

        setService(serviceData)
      } catch (error) {
        console.error('Error fetching service:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id, navigate])

  if (loading) {
    return (
      <div className="loading">
        <div className="loading__spinner"></div>
      </div>
    )
  }

  if (!service) return null

  return (
    <div className="service-detail-page">
      <Navbar />

      <main className="service-detail section">
        <div className="container">
          {/* Back Link */}
          <Link to="/services" className="service-detail__back">
            ← Back to all services
          </Link>

          {/* Header with Image */}
          <div className="service-detail__header">
            <div className="service-detail__intro">
              <Heading level={1} variant="section" color="primary">
                {service.title}
              </Heading>
              <Text size="base" color="muted">
                {service.shortDescription}
              </Text>
            </div>
            <div className="service-detail__hero-image">
              <Image src={service.heroImage || service.image} alt={service.title} />
            </div>
          </div>

          {/* Content */}
          <div className="service-detail__content">
            {/* Main Description */}
            <div className="service-detail__description">
              <Heading level={2} variant="card">
                {service.title}
              </Heading>
              {Array.isArray(service.description)
                ? service.description.map((para, index) => (
                  <Text key={index} size="base" color="dark">
                    {para}
                  </Text>
                ))
                : typeof service.description === 'string'
                  ? service.description.split('\n\n').filter(Boolean).map((para, index) => (
                    <Text key={index} size="base" color="dark">
                      {para}
                    </Text>
                  ))
                  : null}
            </div>

            {/* Sections */}
            {service.sections?.map((section, index) => (
              <div key={index} className="service-detail__section">
                <Heading level={3} variant="card">
                  {section.title}
                </Heading>
                <Text size="base" color="dark">
                  {section.content}
                </Text>
                {section.list && (
                  <ul className="service-detail__list">
                    {section.list.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                )}
                {section.afterContent && (
                  <Text size="base" color="dark">
                    {section.afterContent}
                  </Text>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default ServiceDetailPage
