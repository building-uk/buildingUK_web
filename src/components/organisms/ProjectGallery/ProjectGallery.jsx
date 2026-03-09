import { useState, useEffect } from 'react'
import Label from '@atoms/Label'
import Heading from '@atoms/Heading'
import Text from '@atoms/Text'
import Button from '@atoms/Button'
import ProjectCard from '@organisms/ProjectCard'
import { cmsService } from '@/services/cmsService'
import './ProjectGallery.css'

const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'residential', label: 'Residential' },
  { id: 'commercial', label: 'Commercial' },
  { id: 'restoration', label: 'Restoration' }
]

/**
 * ProjectGallery organism - Projects gallery with filter tabs
 * @param {Object} props
 * @param {Object[]} props.projects - Array of project objects
 */
function ProjectGallery({ projects = [], intro = null }) {
  const [activeCategory, setActiveCategory] = useState('all')
  const [visibleCount, setVisibleCount] = useState(6)


  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter(p => p.category === activeCategory)

  const visibleProjects = filteredProjects.slice(0, visibleCount)
  const hasMore = visibleProjects.length < filteredProjects.length

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 6)
  }

  return (
    <section className="project-gallery section">
      <div className="container">
        {/* Header */}
        <div className="project-gallery__header">
          <div className="project-gallery__layout">
            <div className="project-gallery__image-container">
              {intro?.image ? (
                <img
                  src={intro.image}
                  alt="BuildingUK construction project"
                  className="project-gallery__image"
                />
              ) : (
                <div className="project-gallery__image-placeholder"></div>
              )}
            </div>
            <div className="project-gallery__intro">
              <Label>Projects</Label>
              <Heading level={2} variant="section">
                {intro?.title || "Our Work Speaks for Itself"}
              </Heading>
              <Text size="base" color="dark">
                {intro?.description || "At BuildingUK Ltd, every project reflects our commitment to quality, craftsmanship, and reliable delivery. From home renovations to commercial refurbishments and historic restorations, we transform spaces with precision and care."}
              </Text>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="project-gallery__filters">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              className={`project-gallery__filter ${activeCategory === cat.id ? 'project-gallery__filter--active' : ''}`}
              onClick={() => {
                setActiveCategory(cat.id)
                setVisibleCount(6)
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="project-gallery__grid">
          {visibleProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Load More */}
        {hasMore && (
          <div className="project-gallery__load-more">
            <Button variant="ghost" size="md" onClick={handleLoadMore}>
              Load More
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}

export default ProjectGallery
