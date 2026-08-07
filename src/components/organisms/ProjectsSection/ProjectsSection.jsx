import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionHeader from '@molecules/SectionHeader'
import ProjectCardSkeleton from '@molecules/ProjectCardSkeleton'
import Image from '@atoms/Image'
import Skeleton from '@atoms/Skeleton'
import './ProjectsSection.css'

gsap.registerPlugin(ScrollTrigger)

/**
 * ProjectsSection organism - Projects gallery section
 * @param {Object} props
 * @param {Object[]} props.projects - Array of project objects
 * @param {boolean} props.loading - Loading state
 */
function ProjectsSection({ projects = [], loading = false }) {
  const gridRef = useRef(null)

  useEffect(() => {
    if (loading || !gridRef.current) return

    const items = gridRef.current.querySelectorAll('.projects__item')
    if (!items.length) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        items,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.25,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 88%',
          },
        }
      )
    }, gridRef)

    return () => ctx.revert()
  }, [loading, projects])

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

        <div className="projects__grid" ref={gridRef}>
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
