import { Link } from 'react-router-dom'
import Navbar from '@organisms/Navbar'
import Footer from '@organisms/Footer'
import Heading from '@atoms/Heading'
import Text from '@atoms/Text'
import Button from '@atoms/Button'
import { SEO } from '@atoms'
import './NotFoundPage.css'

function NotFoundPage() {

  return (
    <div className="not-found-page">
      <SEO 
        title="Page Not Found"
        description="The page you are looking for does not exist on BuildingUK."
        noindex={true}
      />
      <Navbar />
      
      <main className="not-found__content container">
        <Heading level={1} className="not-found__title">404</Heading>
        <Heading level={2} variant="section">Page Not Found</Heading>
        
        <Text size="base" color="dark" className="not-found__text">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </Text>
        
        <Button href="/" variant="primary" size="lg">
          Back to Homepage
        </Button>
      </main>
      
      <Footer />
    </div>
  )
}

export default NotFoundPage
