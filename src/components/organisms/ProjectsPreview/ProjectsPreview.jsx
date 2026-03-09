import SectionHeader from '@molecules/SectionHeader'
import Image from '@atoms/Image'
import './ProjectsPreview.css'

/**
 * ProjectsPreview organism - Projects preview section for services page
 * @param {Object} props
 * @param {Object[]} props.projects - Array of project objects (first 4)
 */
function ProjectsPreview({ projects = [] }) {
  return (
    <section className="projects-preview section">
      <div className="container">
        <div className="projects-preview__header">
          <SectionHeader 
            label="Projects"
            title="From Concept to Completion"
          />
          <a href="/projects" className="link-underline">
            See More Projects
          </a>
        </div>
        
        <div className="projects-preview__grid">
          {projects.slice(0, 4).map((project) => (
            <div key={project.id} className="projects-preview__item">
              <Image src={project.image} alt={project.title} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProjectsPreview
