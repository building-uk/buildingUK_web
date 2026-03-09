import { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import Navbar from '@organisms/Navbar'
import Footer from '@organisms/Footer'
import Heading from '@atoms/Heading'
import Text from '@atoms/Text'
import Button from '@atoms/Button'
import Image from '@atoms/Image'
import { cmsService } from '../../services/cmsService'
import { PortableText } from '@portabletext/react'
import './ProjectDetailPage.css'

/**
 * ProjectDetailPage - Individual project detail page
 */
function ProjectDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [project, setProject] = useState(null)
  const [allProjects, setAllProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectData, projects] = await Promise.all([
          cmsService.getProjectById(id),
          cmsService.getProjects()
        ])

        if (!projectData) {
          navigate('/projects')
          return
        }

        setProject(projectData)
        setAllProjects(projects)
      } catch (error) {
        console.error('Error fetching project:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id, navigate])

  // Get next project
  const getNextProject = () => {
    if (!allProjects.length || !project) return null
    const currentIndex = allProjects.findIndex(p => p.id === project.id)
    const nextIndex = (currentIndex + 1) % allProjects.length
    return allProjects[nextIndex]
  }

  if (loading) {
    return (
      <div className="loading">
        <div className="loading__spinner"></div>
      </div>
    )
  }

  if (!project) return null

  const nextProject = getNextProject()

  return (
    <div className="project-detail-page">
      <Navbar />

      <main className="project-detail">
        <div className="project-detail__hero">
          <div className="container">
            {/* Back Link */}
            <Link to="/projects" className="project-detail__back">
              ← Back to all projects
            </Link>

            {/* Project Header */}
            <div className="project-detail__header">
              <Heading level={1} variant="section">
                {project.title}
              </Heading>
              <Text size="base" color="dark" className="project-detail__short-desc">
                {project.shortDescription}
              </Text>
            </div>
          </div>
        </div>

        <div className="section">
          <div className="container">
            {/* Content Grid */}
            <div className="project-detail__content">
              {/* Left - Description & Info Box */}
              <div className="project-detail__main">
                <div className="project-detail__description">
                  {project.description && (
                    <PortableText value={project.description} />
                  )}
                </div>

                {/* Project Info Box (Moved from Sidebar) */}
                <div className="project-detail__info-box">
                  <div className="project-detail__info">
                    <div className="project-detail__info-item">
                      <span className="project-detail__info-label">Project:</span>
                      <span className="project-detail__info-value">{project.title}</span>
                    </div>
                    <div className="project-detail__info-item">
                      <span className="project-detail__info-label">Services:</span>
                      <span className="project-detail__info-value">{project.services}</span>
                    </div>
                    <div className="project-detail__info-item">
                      <span className="project-detail__info-label">Location:</span>
                      <span className="project-detail__info-value">{project.location}</span>
                    </div>
                  </div>

                  <Button href="#contact" variant="primary" size="md">
                    Get in Touch
                  </Button>
                </div>
              </div>

              {/* Right - Large Scrollable Images */}
              <div className="project-detail__sidebar">
                <div className="project-detail__gallery">
                  {project.images?.map((img, index) => (
                    <div key={index} className="project-detail__gallery-item">
                      <Image src={img} alt={`${project.title} - Image ${index + 1}`} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Next Project */}
            {nextProject && (
              <div className="project-detail__next">
                <Link to={`/projects/${nextProject.id}`} className="project-detail__next-link">
                  Next Project →
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default ProjectDetailPage
