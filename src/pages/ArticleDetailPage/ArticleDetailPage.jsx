import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '@organisms/Navbar'
import Footer from '@organisms/Footer'
import ArticleCard from '@organisms/ArticleCard'
import Heading from '@atoms/Heading'
import Text from '@atoms/Text'
import Button from '@atoms/Button'
import Image from '@atoms/Image'
import { PortableText } from '@portabletext/react'
import { cmsService } from '../../services/cmsService'
import { urlFor } from '../../sanityClient'
import './ArticleDetailPage.css'

/**
 * ArticleDetailPage - Individual blog post page
 */
const ptComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <div className="article-detail__inline-image">
          <img
            src={urlFor(value).fit('max').auto('format').url()}
            alt={value.alt || 'Article image'}
            loading="lazy"
          />
          {value.caption && <p className="article-detail__image-caption">{value.caption}</p>}
        </div>
      );
    }
  }
};

function ArticleDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [article, setArticle] = useState(null)
  const [relatedArticles, setRelatedArticles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const articleData = await cmsService.getArticleById(id)

        if (!articleData) {
          navigate('/articles')
          return
        }

        setArticle(articleData)

        // Fetch related articles
        const allArticles = await cmsService.getArticles()

        // 1. Get articles in same category (excluding current)
        let related = allArticles.filter(a =>
          a.id !== articleData.id && a.category === articleData.category
        )

        // 2. If less than 3, add other articles (excluding current and already added)
        if (related.length < 3) {
          const others = allArticles.filter(a =>
            a.id !== articleData.id &&
            a.category !== articleData.category
          )
          related = [...related, ...others]
        }

        // 3. Take exactly 3
        setRelatedArticles(related.slice(0, 3))
      } catch (error) {
        console.error('Error fetching article:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id, navigate])

  if (loading) {
    return (
      <div className="loading">
        <div className="loading__spinner"></div>
      </div>
    )
  }

  if (!article) return null

  return (
    <div className="article-detail-page">
      <Navbar />

      <main>
        <div className="article-detail__hero">
          <div className="container article-detail__container">
            <header className="article-detail__header">
              <div className="article-detail__main-image">
                <Image src={article.image} alt={article.title} />
              </div>
            </header>
          </div>
        </div>

        <article className="article-detail section">
          <div className="container article-detail__container">
            <Heading level={1} variant="section" className="article-detail__title">
              {article.title}
            </Heading>
            <div className="article-detail__meta">
              <div className="article-detail__meta-left">
                <Text size="base">
                  {article.excerpt}
                </Text>
              </div>

              <div className="article-detail__meta-right">
                <span className="article-detail__author">By {article.author}</span>
                <span className="article-detail__date">{article.date}</span>
                <Button variant="ghost" size="sm" className="article-detail__share-btn">
                  SHARE ↗
                </Button>
              </div>
            </div>

            {/* Content */}
            <div className="article-detail__content">
              {article.content ? (
                <PortableText value={article.content} components={ptComponents} />
              ) : null}
            </div>
          </div>
        </article>

        {/* Related Articles */}
        <section className="related-articles section--light">
          <div className="container">
            <div className="related-articles__header">
              <Heading level={2} variant="section">Related Articles</Heading>
              <div className="related-articles__nav">
                <button className="related-articles__nav-btn">←</button>
                <button className="related-articles__nav-btn">→</button>
              </div>
            </div>

            <div className="related-articles__grid">
              {relatedArticles.map(item => (
                <ArticleCard key={item.id} article={item} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default ArticleDetailPage
