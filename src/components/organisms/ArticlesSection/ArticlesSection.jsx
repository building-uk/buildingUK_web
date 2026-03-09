import { Link } from 'react-router-dom'
import SectionHeader from '@molecules/SectionHeader'
import ArticleCardSkeleton from '@molecules/ArticleCardSkeleton'
import Heading from '@atoms/Heading'
import Button from '@atoms/Button'
import Image from '@atoms/Image'
import Skeleton from '@atoms/Skeleton'
import './ArticlesSection.css'

/**
 * ArticleCard component - Individual article card
 */
function ArticleCard({ article }) {
  return (
    <div className="latest-article-card">
      <div className="latest-article-card__image">
        <Image src={article.image} alt={article.title} overlay />
        <div className="latest-article-card__content">
          <Heading level={4} variant="default" color="light">
            {article.title}
          </Heading>
          <Button href={`/articles/${article.id}`} variant="primary" size="md">
            Read More
          </Button>
        </div>
      </div>
    </div>
  )
}

/**
 * ArticlesSection organism - Latest articles section
 * @param {Object} props
 * @param {Object[]} props.articles - Array of article objects
 * @param {boolean} props.loading - Loading state
 */
function ArticlesSection({ articles = [], loading = false }) {
  return (
    <section id="articles" className="articles section">
      <div className="container">
        <div className="articles__header">
          {loading ? (
            <div className="section-header-skeleton">
              <Skeleton variant="text" width="80px" />
              <Skeleton variant="heading" width="260px" height="40px" />
            </div>
          ) : (
            <SectionHeader 
              label="Articles"
              title="Latest Articles & Updates"
            />
          )}
          <div className="articles__header-link">
            <Link to="/articles" className="link-underline">
              Read More Articles
            </Link>
          </div>
        </div>
        
        <div className="articles__grid">
          {loading ? (
            <>
              <ArticleCardSkeleton />
              <ArticleCardSkeleton />
              <ArticleCardSkeleton />
            </>
          ) : (
            articles.slice(0, 3).map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))
          )}
        </div>
      </div>
    </section>
  )
}

export default ArticlesSection
