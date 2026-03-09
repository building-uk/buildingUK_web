import { useState, useEffect } from 'react'
import {
  Navbar,
  PageHero,
  ServicesIntro,
  StatsBar,
  WhyUsAlt,
  ProjectsPreview,
  ContactSection,
  Footer
} from '@organisms/index'
import { cmsService } from '../../services/cmsService'
import './ServicesPage.css'

/**
 * ServicesPage - Services overview page
 */
function ServicesPage() {
  const [data, setData] = useState({
    hero: null,
    intro: null,
    services: [],
    stats: [],
    whyUs: null,
    projects: [],
    contact: null
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fullData = await cmsService.getServicesFullPage()

        setData({
          hero: fullData.hero,
          intro: fullData.intro,
          services: fullData.services,
          stats: fullData.stats,
          whyUs: fullData.whyUs,
          projects: await cmsService.getFeaturedProjects(4),
          contact: await cmsService.getContactInfo()
        })
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

  return (
    <div className="services-page">
      <Navbar />

      <main>
        <PageHero
          title={data.hero?.title}
          backgroundImage={data.hero?.backgroundImage}
        />

        <ServicesIntro services={data.services} />

        <StatsBar stats={data.stats} />

        <WhyUsAlt processes={data.whyUs?.processes} image={data.whyUs?.image} />

        <ProjectsPreview projects={data.projects} />

        <ContactSection contactData={data.contact} />
      </main>

      <Footer />
    </div>
  )
}

export default ServicesPage
