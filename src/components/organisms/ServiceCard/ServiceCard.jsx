import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Heading from '@atoms/Heading'
import Text from '@atoms/Text'
import Button from '@atoms/Button'
import Image from '@atoms/Image'
import './ServiceCard.css'

gsap.registerPlugin(ScrollTrigger)

/**
 * ServiceCard organism - Individual service display
 * @param {Object} props
 * @param {string} props.title - Service title
 * @param {string} props.description - Service description
 * @param {string} props.image - Service image URL
 * @param {string} props.link - Learn more link
 * @param {'left' | 'right'} props.imagePosition - Image alignment
 */
function ServiceCard({ 
  title,
  description,
  image,
  link = '#',
  imagePosition = 'left'
}) {
  const cardRef = useRef(null)

  useEffect(() => {
    if (!cardRef.current) return

    const imageEl = cardRef.current.querySelector('.service-card__image')
    const contentEl = cardRef.current.querySelector('.service-card__content')

    const imgFromX = imagePosition === 'left' ? -60 : 60
    const contentFromX = imagePosition === 'left' ? 60 : -60

    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageEl,
        { opacity: 0, x: imgFromX },
        {
          opacity: 1,
          x: 0,
          duration: 1.3,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 88%',
          },
        }
      )

      gsap.fromTo(
        contentEl,
        { opacity: 0, x: contentFromX },
        {
          opacity: 1,
          x: 0,
          duration: 1.3,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 88%',
          },
        }
      )
    }, cardRef)

    return () => ctx.revert()
  }, [imagePosition])

  return (
    <div ref={cardRef} className={`service-card service-card--${imagePosition}`}>
      <div className="service-card__image">
        <Image src={image} alt={title} />
      </div>
      <div className="service-card__content">
        <Heading level={3} variant="card">{title}</Heading>
        <Text size="base" color="dark">{description}</Text>
        <Button href={link} variant="primary" size="md">
          Learn More
        </Button>
      </div>
    </div>
  )
}

export default ServiceCard
