import { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import Navbar from '@organisms/Navbar'
import Footer from '@organisms/Footer'
import Heading from '@atoms/Heading'
import Text from '@atoms/Text'
import Image from '@atoms/Image'
import { SEO } from '@atoms'
import ProjectsPreview from '@organisms/ProjectsPreview'
import { PortableText } from '@portabletext/react'
import { cmsService } from '../../services/cmsService'
import './ServiceDetailPage.css'

/**
 * Portable Text components — maps Sanity block types to styled HTML
 */
const ptComponents = {
  block: {
    normal: ({ children }) => <p className="service-detail__para">{children}</p>,
    h2: ({ children }) => <h2 className="service-detail__rich-h2">{children}</h2>,
    h3: ({ children }) => <h3 className="service-detail__rich-h3">{children}</h3>,
  },
  list: {
    bullet: ({ children }) => <ul className="service-detail__list">{children}</ul>,
    number: ({ children }) => <ol className="service-detail__list service-detail__list--numbered">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
  },
}

/**
 * ServiceDetailPage - Individual service detail page
 */
function ServiceDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [service, setService] = useState(null)
  const [projects, setProjects] = useState([])
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

        // Try to fetch projects by category (service id usually matches category)
        let projectsData = await cmsService.getProjectsByCategory(id, 4)
        
        // Fallback to featured projects if none found for category
        if (!projectsData || projectsData.length === 0) {
          projectsData = await cmsService.getFeaturedProjects(4)
        }
        
        setProjects(projectsData)
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
      <SEO 
        title={`${service.title} | Services`}
        description={service.shortDescription || `Explore our high-quality ${service.title} services, delivered with meticulous craftsmanship and expert project management in London.`}
        image={service.heroImage || service.image}
        keywords={[service.title.toLowerCase(), 'construction services', 'building service london', 'professional builder']}
      />
      <Navbar />

      <main className="service-detail">
        <div className="service-detail__top section">
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
              <div className="service-detail__rich-text">
                {Array.isArray(service.description) && service.description.length > 0
                  ? <PortableText value={service.description} components={ptComponents} />
                  : typeof service.description === 'string'
                    ? service.description.split('\n\n').filter(Boolean).map((para, index) => (
                      <Text key={index} size="base" color="dark">{para}</Text>
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
        </div>

        <ProjectsPreview projects={projects} />
      </main>

      <Footer />
    </div>
  )
}

export default ServiceDetailPage
