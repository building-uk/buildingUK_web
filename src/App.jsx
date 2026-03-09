import { Suspense, lazy, useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { UIProvider } from './context/UIContext'
import Notification from './components/atoms/Notification'
import ScrollToTop from './components/atoms/ScrollToTop'
import PageLoader from './components/atoms/PageLoader'
import { cmsService } from './services/cmsService'

// Lazy load pages for performance
const HomePage = lazy(() => import('./pages/HomePage/HomePage'))
const AboutPage = lazy(() => import('./pages/AboutPage/AboutPage'))
const ProjectsPage = lazy(() => import('./pages/ProjectsPage/ProjectsPage'))
const ProjectDetailPage = lazy(() => import('./pages/ProjectDetailPage/ProjectDetailPage'))
const ServicesPage = lazy(() => import('./pages/ServicesPage/ServicesPage'))
const ServiceDetailPage = lazy(() => import('./pages/ServiceDetailPage/ServiceDetailPage'))
const ArticlesPage = lazy(() => import('./pages/ArticlesPage/ArticlesPage'))
const ArticleDetailPage = lazy(() => import('./pages/ArticleDetailPage/ArticleDetailPage'))
const ContactPage = lazy(() => import('./pages/ContactPage/ContactPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

function App() {
  const [seoConfig, setSeoConfig] = useState(null)

  useEffect(() => {
    const fetchSEO = async () => {
      try {
        const settings = await cmsService.getSiteSettings()
        if (settings?.seo) {
          const { metaTitle, metaDescription, favicon } = settings.seo

          if (metaTitle) {
            document.title = metaTitle
          }

          if (metaDescription) {
            const metaDescriptionTag = document.querySelector('meta[name="description"]')
            if (metaDescriptionTag) {
              metaDescriptionTag.setAttribute('content', metaDescription)
            }
          }

          if (favicon) {
            const faviconTag = document.querySelector('link[rel="icon"]')
            if (faviconTag) {
              faviconTag.setAttribute('href', favicon)
            }
          }

          setSeoConfig(settings.seo)
        }
      } catch (error) {
        console.error('Error fetching SEO settings:', error)
      }
    }
    fetchSEO()
  }, [])

  return (
    <UIProvider>
      <Router>
        <ScrollToTop />
        <Notification />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/company" element={<AboutPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:id" element={<ProjectDetailPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/:id" element={<ServiceDetailPage />} />
            <Route path="/articles" element={<ArticlesPage />} />
            <Route path="/articles/:id" element={<ArticleDetailPage />} />
            <Route path="/blog" element={<ArticlesPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </Router>
    </UIProvider>
  )
}

export default App
