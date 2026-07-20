import { useState, useEffect, useRef } from 'react'
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
import { SEO } from '@atoms'
import { cmsService } from '../../services/cmsService'
import './ServicesPage.css'

/**
 * ServicesPage - Services overview page
 */
function ServicesPage() {
  const [data, setData] = useState({
    hero: null,
    gallery: [],
    intro: null,
    services: [],
    stats: [],
    whyUs: null,
    projects: [],
    contact: null
  })
  const [loading, setLoading] = useState(true)
  const scrollContainerRef = useRef(null)

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300
      scrollContainerRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' })
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fullData = await cmsService.getServicesFullPage()

        const order = ['residential', 'renovation', 'commercial']
        const sortedServices = (fullData.services || []).sort((a, b) => {
          const indexA = order.findIndex(o => a.id.toLowerCase().includes(o))
          const indexB = order.findIndex(o => b.id.toLowerCase().includes(o))
          return (indexA === -1 ? 99 : indexA) - (indexB === -1 ? 99 : indexB)
        })

        setData({
          hero: fullData.hero,
          gallery: fullData.gallery || [],
          intro: fullData.intro,
          services: sortedServices,
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
      <SEO 
        title="Our Services"
        description="Explore our range of professional construction and building services at BuildingUK. We specialize in high-end residential extensions, complete home renovations, and commercial fit-outs."
        keywords={['building services', 'construction services london', 'residential renovation', 'commercial building work', 'renovations company london']}
      />
      <Navbar />

      <main>
        <PageHero
          title={data.hero?.title}
          backgroundImage={data.hero?.backgroundImage}
        />

        {data.gallery?.length > 0 && (
          <section className="section pt-xl pb-0">
            <div className="container" style={{ position: 'relative' }}>
              <button 
                onClick={() => scroll('left')}
                style={{
                  position: 'absolute',
                  left: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 10,
                  background: 'rgba(255,255,255,0.8)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  fontSize: '24px',
                  color: '#1a1a1a',
                  lineHeight: 1
                }}
                aria-label="Scroll left"
              >
                &#8249;
              </button>
              
              <button 
                onClick={() => scroll('right')}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 10,
                  background: 'rgba(255,255,255,0.8)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  fontSize: '24px',
                  color: '#1a1a1a',
                  lineHeight: 1
                }}
                aria-label="Scroll right"
              >
                &#8250;
              </button>

              <div 
                ref={scrollContainerRef}
                className="gallery-carousel"
                style={{ 
                  display: 'flex', 
                  gap: '0.75rem', 
                  overflowX: 'auto',
                  scrollSnapType: 'x mandatory',
                  paddingBottom: '0.5rem',
                  WebkitOverflowScrolling: 'touch',
                }}
              >
                <style>
                  {`
                    .gallery-carousel::-webkit-scrollbar {
                      height: 6px;
                    }
                    .gallery-carousel::-webkit-scrollbar-track {
                      background: rgba(0,0,0,0.05);
                      border-radius: 4px;
                    }
                    .gallery-carousel::-webkit-scrollbar-thumb {
                      background: rgba(0,0,0,0.15);
                      border-radius: 4px;
                    }
                    .gallery-carousel::-webkit-scrollbar-thumb:hover {
                      background: rgba(0,0,0,0.3);
                    }
                  `}
                </style>
                {data.gallery.map((imgUrl, idx) => (
                  <img 
                    key={idx} 
                    src={imgUrl} 
                    alt={`Service Gallery ${idx + 1}`}
                    style={{ 
                      flex: '0 0 calc(33.333% - 0.5rem)', 
                      minWidth: '280px',
                      height: '350px', 
                      objectFit: 'cover', 
                      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                      scrollSnapAlign: 'start'
                    }} 
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        <ServicesIntro 
          services={data.services} 
          intro={data.intro}
        />

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
