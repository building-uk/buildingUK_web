import { useEffect, useState } from 'react'
import {
  Navbar,
  HeroSection,
  AboutSection,
  TestimonialsSection,
  ServicesSection,
  ProjectsSection,
  WhyUsSection,
  ArticlesSection,
  ContactSection,
  Footer
} from '@organisms/index'
import { SEO } from '@atoms'
import { cmsService } from '../../services/cmsService'
import './HomePage.css'

/**
 * HomePage - Landing page composing all sections
 */
function HomePage() {

  const [data, setData] = useState({
    hero: null,
    about: null,
    services: [],
    testimonials: [],
    projects: [],
    processes: [],
    articles: [],
    contact: null
  })
  const [loading, setLoading] = useState({
    hero: true,
    about: true,
    services: true,
    testimonials: true,
    projects: true,
    processes: true,
    articles: true,
    contact: true
  })

  useEffect(() => {
    // Fetch each section independently for granular skeleton loading
    const fetchSection = async (key, fetcher) => {
      try {
        const result = await fetcher()
        setData(prev => ({ ...prev, [key]: result }))
      } catch (error) {
        console.error(`Error fetching ${key}:`, error)
      } finally {
        setLoading(prev => ({ ...prev, [key]: false }))
      }
    }

    // Parallel fetch all sections
    fetchSection('hero', () => cmsService.getHeroContent())
    fetchSection('about', () => cmsService.getAboutContent())
    fetchSection('services', async () => {
      const services = await cmsService.getServices()
      const order = ['refurbishment', 'fire', 'restoration', 'commercial']
      return services.sort((a, b) => {
        const indexA = order.findIndex(o => a.id.toLowerCase().includes(o))
        const indexB = order.findIndex(o => b.id.toLowerCase().includes(o))
        return (indexA === -1 ? 99 : indexA) - (indexB === -1 ? 99 : indexB)
      })
    })
    fetchSection('testimonials', () => cmsService.getTestimonials())
    fetchSection('projects', () => cmsService.getFeaturedProjects(3))
    fetchSection('processes', () => cmsService.getProcesses())
    fetchSection('articles', () => cmsService.getLatestArticles(3))
    fetchSection('contact', () => cmsService.getContactInfo())
  }, [])

  return (
    <div className="home-page">
      <SEO 
        title="High-End Construction & Renovations"
        description="BuildingUK delivers premier residential construction, high-end extensions, commercial fit-outs, and complete renovations. Contact us today for a consultation in London."
        keywords={['construction', 'renovation', 'residential builder', 'commercial construction', 'house extension', 'london builder', 'BuildingUK']}
      />
      <Navbar />

      <main>
        <HeroSection
          title={data.hero?.title}
          subtitle={data.hero?.subtitle}
          ctaText={data.hero?.ctaText || 'BOOK A CONSULTATION'}
          ctaLink={data.hero?.ctaLink || '#contact'}
          images={data.hero?.images?.length ? data.hero.images : []}
          loading={loading.hero}
        />

        <AboutSection
          data={{
            ...data.about,
            ctaLink: '/about'
          }}
          loading={loading.about}
        />

        <TestimonialsSection
          testimonials={data.testimonials}
          loading={loading.testimonials}
        />

        <ServicesSection services={data.services} loading={loading.services} />

        <ProjectsSection projects={data.projects} loading={loading.projects} />

        <WhyUsSection
          processes={data.processes?.processes}
          image={data.processes?.image}
          loading={loading.processes}
        />

        <ArticlesSection articles={data.articles} loading={loading.articles} />

        <ContactSection contactData={data.contact} loading={loading.contact} />
      </main>

      <Footer />
    </div>
  )
}

export default HomePage
