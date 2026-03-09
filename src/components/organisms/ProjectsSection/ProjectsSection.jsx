import { Link } from 'react-router-dom'
import SectionHeader from '@molecules/SectionHeader'
import ProjectCardSkeleton from '@molecules/ProjectCardSkeleton'
import Image from '@atoms/Image'
import Skeleton from '@atoms/Skeleton'
import './ProjectsSection.css'

/**
 * ProjectsSection organism - Projects gallery section
 * @param {Object} props
 * @param {Object[]} props.projects - Array of project objects
 * @param {boolean} props.loading - Loading state
 */
function ProjectsSection({ projects = [], loading = false }) {
  return (
    <section id="projects" className="projects section">
      <div className="container">
        <div className="projects__header">
          {loading ? (
            <div className="section-header-skeleton">
              <Skeleton variant="text" width="80px" />
              <Skeleton variant="heading" width="280px" height="40px" />
            </div>
          ) : (
            <SectionHeader
              label="Projects"
              title="From Concept to Completion"
              align="left"
            />
          )}
          <Link to="/projects" className="link-underline">
            See More Projects
          </Link>
        </div>

        <div className="projects__grid">
          {loading ? (
            <>
              <ProjectCardSkeleton />
              <ProjectCardSkeleton />
              <ProjectCardSkeleton />
            </>
          ) : (
            projects.slice(0, 3).map((project) => (
              <Link key={project.id} to={`/projects/${project.id}`} className="projects__item">
                <Image src={project.image} alt={project.title} />
                <div className="projects__overlay">
                  <span className="projects__title">{project.title}</span>
                  <span className="projects__location">{project.location}</span>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </section>
  )
}

export default ProjectsSection
