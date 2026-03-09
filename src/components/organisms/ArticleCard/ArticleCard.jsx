import { Link } from 'react-router-dom'
import Heading from '@atoms/Heading'
import Text from '@atoms/Text'
import Button from '@atoms/Button'
import Image from '@atoms/Image'
import './ArticleCard.css'

/**
 * ArticleCard organism - Article card for blog listing
 * @param {Object} props
 * @param {Object} props.article - Article data
 */
function ArticleCard({ article }) {
  const { id, title, image, excerpt } = article

  return (
    <div className="article-card">
      <Link to={`/articles/${id}`} className="article-card__image-link">
        <div className="article-card__image">
          <Image src={image} alt={title} />
        </div>
      </Link>
      <div className="article-card__content">
        <Link to={`/articles/${id}`} className="article-card__title-link">
          <Heading level={3} variant="default" color="dark">
            {title}
          </Heading>
        </Link>
        <Text size="sm" color="body" className="article-card__excerpt">
          {excerpt}
        </Text>
        <Button href={`/articles/${id}`} variant="primary" size="sm">
          READ MORE
        </Button>
      </div>
    </div>
  )
}

export default ArticleCard
