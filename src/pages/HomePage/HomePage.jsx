import { useEffect, useState } from 'react'
import {
  Navbar,
  HeroSection,
  AboutSection,
  ServicesSection,
  ProjectsSection,
  WhyUsSection,
  ArticlesSection,
  ContactSection,
  Footer
} from '@organisms/index'
import { cmsService } from '../../services/cmsService'
import { usePageTitle } from '../../hooks'
import './HomePage.css'

/**
 * HomePage - Landing page composing all sections
 */
function HomePage() {
  usePageTitle('Home')

  const [data, setData] = useState({
    hero: null,
    about: null,
    services: [],
    projects: [],
    processes: [],
    articles: [],
    contact: null
  })
  const [loading, setLoading] = useState({
    hero: true,
    about: true,
    services: true,
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
    fetchSection('services', () => cmsService.getServices())
    fetchSection('projects', () => cmsService.getFeaturedProjects(3))
    fetchSection('processes', () => cmsService.getProcesses())
    fetchSection('articles', () => cmsService.getLatestArticles(3))
    fetchSection('contact', () => cmsService.getContactInfo())
  }, [])

  return (
    <div className="home-page">
      <Navbar />

      <main>
        <HeroSection
          title={data.hero?.title}
          subtitle={data.hero?.subtitle}
          ctaText={data.hero?.ctaText}
          ctaLink={data.hero?.ctaLink}
          images={data.hero?.images?.length ? data.hero.images : []}
          loading={loading.hero}
        />

        <AboutSection data={data.about} loading={loading.about} />

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
