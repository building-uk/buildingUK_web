import { Link } from 'react-router-dom'
import Heading from '@atoms/Heading'
import Image from '@atoms/Image'
import './ProjectCard.css'

/**
 * ProjectCard organism - Project card for gallery
 * @param {Object} props
 * @param {Object} props.project - Project data
 */
function ProjectCard({ project }) {
  const { id, title, image, location } = project
  
  return (
    <Link to={`/projects/${id}`} className="project-card">
      <div className="project-card__image">
        <Image src={image} alt={title} overlay />
      </div>
      <div className="project-card__content">
        <Heading level={4} variant="default" color="light">
          {title}
        </Heading>
        <span className="project-card__location">{location}</span>
      </div>
    </Link>
  )
}

export default ProjectCard
