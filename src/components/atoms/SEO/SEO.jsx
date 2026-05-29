import { Helmet } from 'react-helmet-async'

/**
 * SEO Component - Injects SEO tags and Schema.org structured data dynamically
 * 
 * @param {Object} props
 * @param {string} props.title - Page title (concatenated with ' | BuildingUK')
 * @param {string} props.description - Meta description
 * @param {Array<string>|string} [props.keywords] - Meta keywords
 * @param {string} [props.image] - Custom Open Graph & Twitter image
 * @param {string} [props.url] - Canonical or Open Graph URL page link
 * @param {string} [props.type='website'] - Open Graph type (e.g. 'website', 'article')
 * @param {boolean} [props.noindex=false] - If true, injects noindex robots rule
 * @param {Object|Array<Object>} [props.schema] - Optional page-specific Schema.org structured data
 */
export default function SEO({ title, description, keywords, image, url, type = 'website', noindex = false, schema }) {
  const siteTitle = title ? `${title} | BuildingUK` : 'BuildingUK | High-End Construction & Renovations'
  const finalKeywords = Array.isArray(keywords) ? keywords.join(', ') : keywords

  // Default corporate LocalBusiness schema for rich search snippets
  const defaultBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    'name': 'BuildingUK',
    'image': 'https://building.uk.com/images/BuildingUK-LogoMark.png',
    '@id': 'https://building.uk.com/#localbusiness',
    'url': 'https://building.uk.com',
    'telephone': '0787 920 8628',
    'email': 'info@building.uk.com',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': '18 Spring Street',
      'addressLocality': 'London',
      'postalCode': 'W2 3RA',
      'addressCountry': 'GB'
    },
    'areaServed': 'London, UK'
  }

  // Combine schemas into an array
  const schemasToRender = [defaultBusinessSchema]
  if (schema) {
    if (Array.isArray(schema)) {
      schemasToRender.push(...schema)
    } else {
      schemasToRender.push(schema)
    }
  }

  // Dynamically resolve canonical URL
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : ''
  const canonicalUrl = url || `https://building.uk.com${currentPath}`

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{siteTitle}</title>
      {description && <meta name="description" content={description} />}
      {finalKeywords && <meta name="keywords" content={finalKeywords} />}
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={siteTitle} />
      {description && <meta property="og:description" content={description} />}
      {image && <meta property="og:image" content={image} />}
      <meta property="og:url" content={canonicalUrl} />

      {/* Twitter Cards */}
      <meta name="twitter:card" content={image ? 'summary_large_image' : 'summary'} />
      <meta name="twitter:title" content={siteTitle} />
      {description && <meta name="twitter:description" content={description} />}
      {image && <meta name="twitter:image" content={image} />}

      {/* Schema.org Structured Data */}
      {schemasToRender.map((s, idx) => (
        <script key={idx} type="application/ld+json">
          {JSON.stringify(s)}
        </script>
      ))}
    </Helmet>
  )
}
