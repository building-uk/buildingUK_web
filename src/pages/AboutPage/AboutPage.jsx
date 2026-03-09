import { useEffect, useState } from 'react'
import {
  Navbar,
  PageHero,
  AboutIntro,
  WhyChooseUs,
  ImageGallery,
  BehindTheBuild,
  TestimonialsAlt,
  ContactSection,
  Footer
} from '@organisms/index'
import { cmsService } from '../../services/cmsService'
import './AboutPage.css'

/**
 * AboutPage - About us page with introduction, why choose us, testimonials
 */
function AboutPage() {
  const [data, setData] = useState({
    hero: null,
    intro: null,
    gallery: [],
    whyChooseUs: null,
    team: null,
    testimonials: [],
    contact: null
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fullData = await cmsService.getAboutFullContent()

        if (fullData) {
          setData({
            hero: fullData.hero,
            intro: fullData.intro,
            gallery: fullData.gallery || [],
            whyChooseUs: fullData.whyChooseUs,
            team: fullData.team,
            testimonials: fullData.testimonials || [],
            contact: fullData.contact
          })
        }
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
    <div className="about-page">
      <Navbar />

      <main>
        <PageHero
          title={data.hero?.title}
          backgroundImage={data.hero?.backgroundImage}
        />

        <AboutIntro data={data.intro} />

        <ImageGallery images={data.gallery} />

        <WhyChooseUs data={data.whyChooseUs} />

        <BehindTheBuild data={data.team} />

        <TestimonialsAlt
          testimonials={data.testimonials}
          backgroundImage={data.testimonialsBackground || "/images/testimonials-bg.jpg"}
        />

        <ContactSection contactData={data.contact} />
      </main>

      <Footer />
    </div>
  )
}

export default AboutPage
