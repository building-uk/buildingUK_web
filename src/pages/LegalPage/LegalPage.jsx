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

/**
 * Converts a string or PortableText block value into a URL-safe anchor id.
 * e.g. "1. Introduction and Definitions 1" → "1-introduction-and-definitions"
 */
function slugifyHeading(blockValue) {
  let text = ''
  if (typeof blockValue === 'string') {
    text = blockValue
  } else if (blockValue?.children) {
    text = blockValue.children
      .map(child => child.text || '')
      .join('')
  }
  // Strip trailing page number / tab numbers
  text = text.trim().replace(/[\t\s]*\d+\s*$/, '').trim()
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

/**
 * Helper to smoothly scroll to a DOM target element or heading.
 */
function scrollToElementId(elementId, rawText = '') {
  let target = document.getElementById(elementId)

  // Fallback 1: Match by section number prefix e.g. "10-" from "10-liability-and-insurance"
  if (!target && elementId) {
    const numPrefix = elementId.match(/^(\d+)-/)?.[1]
    if (numPrefix) {
      const headings = document.querySelectorAll(
        '.rich-text h1, .rich-text h2, .rich-text h3, .rich-text h4, .rich-text p[id]'
      )
      for (const el of headings) {
        const text = el.textContent.trim()
        if (
          text.startsWith(`${numPrefix}.`) ||
          text.startsWith(`${numPrefix} `) ||
          el.id === elementId ||
          el.id.startsWith(`${numPrefix}-`)
        ) {
          if (!/^\d+\.\d+/.test(text) || text.startsWith(`${numPrefix}.`)) {
            target = el
            break
          }
        }
      }
    }
  }

  // Fallback 2: Search headings/paragraphs containing matching text or number
  if (!target && rawText) {
    const headings = document.querySelectorAll(
      '.rich-text h1, .rich-text h2, .rich-text h3, .rich-text h4, .rich-text p[id]'
    )
    const numMatch = rawText.match(/^(\d+)\./)?.[1]
    for (const el of headings) {
      const elText = el.textContent.trim()
      if (numMatch && (elText.startsWith(`${numMatch}.`) || elText.startsWith(`${numMatch} `))) {
        target = el
        break
      }
    }
  }

  if (!target) return

  // Smooth scroll with proper header offset
  const headerOffset = 100
  const elementPosition = target.getBoundingClientRect().top
  const offsetPosition = elementPosition + window.pageYOffset - headerOffset

  window.scrollTo({
    top: Math.max(0, offsetPosition),
    behavior: 'smooth'
  })
}

/**
 * Smoothly scrolls back to top / Table of Contents
 */
function scrollToTop() {
  const topTarget =
    document.getElementById('table-of-contents') ||
    document.getElementById('top') ||
    document.querySelector('.legal-page__content')

  if (topTarget) {
    const headerOffset = 80
    const elementPosition = topTarget.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset
    window.scrollTo({
      top: Math.max(0, offsetPosition),
      behavior: 'smooth'
    })
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

/**
 * Derives an in-page anchor from display text or node content.
 */
function textToAnchorId(nodeOrText) {
  const extractText = (node) => {
    if (typeof node === 'string') return node
    if (Array.isArray(node)) return node.map(extractText).join('')
    if (node?.props?.children) return extractText(node.props.children)
    return ''
  }
  const raw = extractText(nodeOrText)
  return { id: slugifyHeading(raw), raw }
}

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
        description={`Read the official ${data.title} page for BuildingUK. We are dedicated to providing clear terms, transparency, and safety compliance across our services.`}
      />
      <Navbar />
      
      <main>
        <PageHero 
          title={data.title} 
          backgroundImage={data.backgroundImage}
        />
        
        <section className="section">
          <div className="container">
            <div className="legal-page__content" id="top">
              <Heading level={2} variant="section" className="mb-lg" id="table-of-contents">
                {data.title}
              </Heading>
              
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
                      },
                      block: {
                        h1: ({ children, value }) => {
                          const id = slugifyHeading(value)
                          return <h1 id={id}>{children}</h1>
                        },
                        h2: ({ children, value }) => {
                          const id = slugifyHeading(value)
                          return <h2 id={id}>{children}</h2>
                        },
                        h3: ({ children, value }) => {
                          const id = slugifyHeading(value)
                          const fullText = value?.children?.map(c => c.text || '').join('').trim() || ''
                          const isNumbered = /^\d+\.\s+[A-Za-z]/.test(fullText)
                          const sectionNum = fullText.match(/^(\d+)\./)?.[1]
                          const showReturnToTop = isNumbered && parseInt(sectionNum, 10) > 1

                          return (
                            <>
                              {showReturnToTop && (
                                <div className="legal-page__return-to-top-wrapper">
                                  <a
                                    href="#table-of-contents"
                                    className="legal-page__return-to-top"
                                    onClick={(e) => {
                                      e.preventDefault()
                                      scrollToTop()
                                    }}
                                  >
                                    ↑ Return to top
                                  </a>
                                </div>
                              )}
                              <h3 id={id}>{children}</h3>
                            </>
                          )
                        },
                        h4: ({ children, value }) => {
                          const id = slugifyHeading(value)
                          return <h4 id={id}>{children}</h4>
                        },
                        normal: ({ children, value }) => {
                          const fullText = value?.children?.map(c => c.text || '').join('').trim() || ''
                          
                          // Check if block is a TOC item starting with e.g. "1. Introduction" or "10. Liability"
                          const isTocItem = /^\d+\.\s+[A-Za-z]/.test(fullText)
                          if (isTocItem) {
                            const { id: targetId, raw } = textToAnchorId(fullText)
                            // Clean trailing page number suffix (e.g. "10. Liability and Insurance 10" -> "10. Liability and Insurance")
                            const displayTitle = fullText.replace(/[\t\s]*\d+\s*$/, '').trim()
                            return (
                              <p className="legal-page__toc-item">
                                <a
                                  href={`#${targetId}`}
                                  className="legal-page__toc-link"
                                  onClick={(e) => {
                                    e.preventDefault()
                                    scrollToElementId(targetId, raw)
                                  }}
                                >
                                  {displayTitle}
                                </a>
                              </p>
                            )
                          }

                          // Also add IDs to strong-only normal blocks or numbered paragraphs that act as section titles
                          const isNumberedHeading = /^\d+\.\s+/.test(fullText)
                          const isAllStrong = value?.children?.length > 0 &&
                            value.children.every(child => child.marks?.includes('strong') || child.text?.trim() === '')
                          if (isAllStrong || isNumberedHeading) {
                            const id = slugifyHeading(value)
                            return id ? <p id={id}>{children}</p> : <p>{children}</p>
                          }
                          return <p>{children}</p>
                        }
                      },
                      marks: {
                        link: ({ children, value }) => {
                          const href = value?.href || ''
                          const isAnchor = href.startsWith('#') || href.includes('docs.google.com')
                          
                          if (isAnchor) {
                            const { id: targetId, raw } = href.startsWith('#')
                              ? { id: href.slice(1), raw: '' }
                              : textToAnchorId(children)
                            
                            return (
                              <a
                                href={`#${targetId}`}
                                onClick={(e) => {
                                  e.preventDefault()
                                  scrollToElementId(targetId, raw)
                                }}
                              >
                                {children}
                              </a>
                            )
                          }
                          // External links open in new tab
                          const isExternal = href.startsWith('http')
                          return (
                            <a
                              href={href}
                              target={isExternal ? '_blank' : undefined}
                              rel={isExternal ? 'noopener noreferrer' : undefined}
                            >
                              {children}
                            </a>
                          )
                        }
                      }
                    }} 
                  />
                  <div className="legal-page__return-to-top-wrapper legal-page__return-to-top-wrapper--end">
                    <a
                      href="#table-of-contents"
                      className="legal-page__return-to-top"
                      onClick={(e) => {
                        e.preventDefault()
                        scrollToTop()
                      }}
                    >
                      ↑ Return to top
                    </a>
                  </div>
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
