import { Helmet } from 'react-helmet-async'

/**
 * SEO Component - Injects per-page SEO tags dynamically
 * 
 * @param {Object} props
 * @param {string} props.title - Page title (concatenated with ' | BuildingUK')
 * @param {string} props.description - Meta description
 * @param {string} [props.image] - Custom Open Graph & Twitter image
 * @param {string} [props.url] - Explicit canonical or Open Graph URL link
 * @param {string} [props.type='website'] - Open Graph type (e.g. 'website', 'article')
 * @param {boolean} [props.noindex=false] - If true, injects noindex robots rule
 * @param {Object|Array<Object>} [props.schema] - Optional page-specific Schema.org structured data (e.g. Article)
 */
export default function SEO({ title, description, image, url, type = 'website', noindex = false, schema }) {
  const siteTitle = title ? `${title} | BuildingUK` : 'Home Renovation & Refurbishment Central London | BuildingUK'
  const siteDescription = description || 'Female-led, Which? Trusted Trader builders in Central London. Home renovation and refurbishment from small repairs to full projects, plus fire door services.'

  // Build clean canonical and og:url without query strings
  let rawPath = typeof window !== 'undefined' ? window.location.pathname : ''
  // Strip query string if any
  rawPath = rawPath.split('?')[0]
  // Standardize path format: root '/' stays '/', subpaths strip trailing slashes (e.g. '/about/') -> '/about'
  const cleanPath = (rawPath === '/' || rawPath === '') ? '/' : rawPath.replace(/\/+$|^\/+/g, (m, offset) => offset === 0 ? '/' : '')
  const canonicalUrl = url || `https://www.building.uk.com${cleanPath}`

  const defaultImage = 'https://www.building.uk.com/images/og-image.jpg'
  const shareImage = image || defaultImage

  // Process page-specific schema if provided (without duplicating the index.html GeneralContractor schema)
  const schemasToRender = []
  if (schema) {
    if (Array.isArray(schema)) {
      schemasToRender.push(...schema)
    } else {
      schemasToRender.push(schema)
    }
  }

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{siteTitle}</title>
      <meta name="description" content={siteDescription} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Social */}
      <meta property="og:type" content={type} />
      <meta property="og:locale" content="en_GB" />
      <meta property="og:site_name" content="BuildingUK" />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={siteDescription} />
      <meta property="og:url" content={canonicalUrl} />
      {shareImage && <meta property="og:image" content={shareImage} />}

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={siteDescription} />
      {shareImage && <meta name="twitter:image" content={shareImage} />}

      {/* Optional Page-Specific Schema.org Structured Data */}
      {schemasToRender.map((s, idx) => (
        <script key={idx} type="application/ld+json">
          {JSON.stringify(s)}
        </script>
      ))}
    </Helmet>
  )
}
