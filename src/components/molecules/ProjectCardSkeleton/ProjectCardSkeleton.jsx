import Skeleton from '@atoms/Skeleton'
import './ProjectCardSkeleton.css'

/**
 * ProjectCardSkeleton - Loading placeholder for ProjectCard
 */
function ProjectCardSkeleton() {
  return (
    <div className="project-card-skeleton">
      <Skeleton variant="image" height="280px" />
      <div className="project-card-skeleton__content">
        <Skeleton variant="heading" width="80%" />
        <Skeleton variant="text" width="50%" />
      </div>
    </div>
  )
}

export default ProjectCardSkeleton
