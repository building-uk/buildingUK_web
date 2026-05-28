import { useState, useEffect } from 'react'
import {
  Navbar,
  PageHero,
  ArticleGallery,
  ContactSection,
  Footer
} from '@organisms/index'
import { SEO } from '@atoms'
import { cmsService } from '../../services/cmsService'
import './ArticlesPage.css'

/**
 * ArticlesPage - Blog listing page
 */
function ArticlesPage() {
  const [data, setData] = useState({
    hero: null,
    articles: [],
    contact: null
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fullData = await cmsService.getArticlesFullPage()

        setData({
          hero: fullData.hero,
          articles: fullData.articles,
          contact: fullData.contact
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
    <div className="articles-page">
      <SEO 
        title="Latest Articles & Construction Insights"
        description="Stay updated with the latest news, expert guides, home renovation advice, and commercial design trends from BuildingUK."
        keywords={['construction blog london', 'building contractor tips', 'renovation guides', 'BuildingUK news']}
      />
      <Navbar />

      <main>
        <PageHero
          title={data.hero?.title}
          backgroundImage={data.hero?.backgroundImage}
        />

        <ArticleGallery articles={data.articles} />

        <ContactSection contactData={data.contact} />
      </main>

      <Footer />
    </div>
  )
}

export default ArticlesPage
