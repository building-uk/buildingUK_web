import Skeleton from '@atoms/Skeleton'
import './ArticleCardSkeleton.css'

/**
 * ArticleCardSkeleton - Loading placeholder for ArticleCard
 */
function ArticleCardSkeleton() {
  return (
    <div className="article-card-skeleton">
      <Skeleton variant="image" height="200px" />
      <div className="article-card-skeleton__content">
        <Skeleton variant="heading" width="90%" />
        <Skeleton variant="text" lines={2} />
        <Skeleton variant="button" width="100px" />
      </div>
    </div>
  )
}

export default ArticleCardSkeleton
