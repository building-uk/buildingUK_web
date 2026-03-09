import { useState, useEffect } from 'react'
import {
  Navbar,
  PageHero,
  ProjectGallery,
  TestimonialsSection,
  ContactSection,
  Footer
} from '@organisms/index'
import { cmsService } from '../../services/cmsService'
import './ProjectsPage.css'

/**
 * ProjectsPage - Projects gallery page with filters
 */
function ProjectsPage() {
  const [data, setData] = useState({
    hero: null,
    projects: [],
    testimonials: [],
    contact: null
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fullData = await cmsService.getProjectsFullPage()

        setData({
          hero: fullData.hero,
          intro: fullData.intro,
          projects: fullData.projects,
          testimonials: fullData.testimonials,
          contact: fullData.contact
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
    <div className="projects-page">
      <Navbar />

      <main>
        <PageHero
          title={data.hero?.title}
          backgroundImage={data.hero?.backgroundImage}
        />

        <ProjectGallery projects={data.projects} intro={data.intro} />

        <TestimonialsSection testimonials={data.testimonials} />

        <ContactSection contactData={data.contact} />
      </main>

      <Footer />
    </div>
  )
}

export default ProjectsPage
