import { useState } from 'react'
import Label from '@atoms/Label'
import Heading from '@atoms/Heading'
import Text from '@atoms/Text'
import ArticleCard from '@organisms/ArticleCard'
import './ArticleGallery.css'

const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'insights', label: 'Insights' },
  { id: 'guides', label: 'Guides' },
  { id: 'projects', label: 'Projects' },
  { id: 'updates', label: 'Updates' }
]

/**
 * ArticleGallery organism - Articles list with filtering and pagination
 * @param {Object} props
 * @param {Object[]} props.articles - Array of article objects
 */
function ArticleGallery({ articles = [] }) {
  const [activeCategory, setActiveCategory] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6
  
  const filteredArticles = activeCategory === 'all'
    ? articles
    : articles.filter(a => a.category === activeCategory)
    
  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage)
  
  const currentArticles = filteredArticles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )
  
  return (
    <section className="article-gallery section">
      <div className="container">
        {/* Header */}
        <div className="article-gallery__header">
          <Label>Articles & News</Label>
          <Heading level={2} variant="section">
            Discover our latest guides, tips, and project highlights.
          </Heading>
        </div>
        
        {/* Filters */}
        <div className="article-gallery__filters">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              className={`article-gallery__filter ${activeCategory === cat.id ? 'article-gallery__filter--active' : ''}`}
              onClick={() => {
                setActiveCategory(cat.id)
                setCurrentPage(1)
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>
        
        {/* Grid */}
        <div className="article-gallery__grid">
          {currentArticles.map(article => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="article-gallery__pagination">
            <button 
              className="article-gallery__page-btn"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
            >
              &lt;
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                className={`article-gallery__page-btn ${currentPage === page ? 'active' : ''}`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
            
            <button 
              className="article-gallery__page-btn"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => prev + 1)}
            >
              &gt;
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

export default ArticleGallery
