import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { PortableText } from '@portabletext/react'
import Navbar from '@organisms/Navbar'
import Footer from '@organisms/Footer'
import PageHero from '@organisms/PageHero'
import Heading from '@atoms/Heading'
import Text from '@atoms/Text'
import { SEO } from '@atoms'
import { cmsService } from '../../services/cmsService'
import { urlFor } from '../../sanityClient'
import './LegalPage.css'

function LegalPage() {
  const { pathname } = useLocation()
  const slug = pathname.replace('/', '')
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pageData = await cmsService.getLegalPageBySlug(slug)
        
        if (pageData) {
          setData(pageData)
        } else {
          // Fallback if not in CMS
          const infoLinks = await cmsService.getFooterLinks()
          const currentLink = infoLinks.info.find(l => l.to.includes(slug))
          
          setData({
            title: currentLink?.label || 'Legal Information',
            content: 'Content coming soon...'
          })
        }
      } catch (error) {
        console.error('Error fetching legal page:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [slug])

  if (loading) {
    return <div className="loading"><div className="loading__spinner"></div></div>
  }

  return (
    <div className="legal-page">
      <SEO 
        title={data.title}
        description={`Read the official ${data.title} page of BuildingUK. We are dedicated to providing clear terms, transparency, and safety compliance in our construction operations.`}
        keywords={[(data.title || '').toLowerCase(), 'terms', 'privacy policy london', 'construction legal info']}
      />
      <Navbar />
      
      <main>
        <PageHero 
          title={data.title} 
          backgroundImage={data.backgroundImage}
        />
        
        <section className="section">
          <div className="container">
            <div className="legal-page__content">
              <Heading level={2} variant="section" className="mb-lg">{data.title}</Heading>
              
              {Array.isArray(data.content) ? (
                <div className="rich-text">
                  <PortableText 
                    value={data.content} 
                    components={{
                      types: {
                        image: ({ value }) => {
                          if (!value?.asset?._ref) return null
                          return (
                            <div className="legal-page__image-wrapper" style={{ margin: '2rem auto', maxWidth: '600px', textAlign: 'center' }}>
                              <img
                                alt={value.alt || ' '}
                                loading="lazy"
                                src={urlFor(value).width(600).fit('max').auto('format').url()}
                                style={{ width: '100%', height: 'auto', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
                              />
                            </div>
                          )
                        },
                        imageGallery: ({ value }) => {
                          if (!value?.images || value.images.length === 0) return null
                          return (
                            <div className="legal-page__gallery-wrapper" style={{ 
                              display: 'grid', 
                              gridTemplateColumns: `repeat(auto-fit, minmax(250px, 1fr))`, 
                              gap: '1.5rem', 
                              margin: '2.5rem 0' 
                            }}>
                              {value.images.map((img, i) => {
                                if (!img?.asset?._ref) return null
                                return (
                                  <img
                                    key={i}
                                    alt={img.alt || `Gallery image ${i + 1}`}
                                    loading="lazy"
                                    src={urlFor(img).width(500).height(400).fit('crop').auto('format').url()}
                                    style={{ width: '100%', height: '350px', objectFit: 'cover', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
                                  />
                                )
                              })}
                            </div>
                          )
                        }
                      }
                    }} 
                  />
                </div>
              ) : (
                <Text size="base" color="dark">
                  {data.content}
                </Text>
              )}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
}

export default LegalPage
