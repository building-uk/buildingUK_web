import { Helmet } from 'react-helmet-async'

/**
 * SEO Component - Injects SEO tags dynamically into the document head
 * 
 * @param {Object} props
 * @param {string} props.title - Page title (concatenated with ' | BuildingUK')
 * @param {string} props.description - Meta description
 * @param {Array<string>|string} [props.keywords] - Meta keywords
 * @param {string} [props.image] - Custom Open Graph & Twitter image
 * @param {string} [props.url] - Canonical or Open Graph URL page link
 * @param {string} [props.type='website'] - Open Graph type (e.g. 'website', 'article')
 * @param {boolean} [props.noindex=false] - If true, injects noindex robots rule
 */
export default function SEO({ title, description, keywords, image, url, type = 'website', noindex = false }) {
  const siteTitle = title ? `${title} | BuildingUK` : 'BuildingUK | High-End Construction & Renovations'
  const finalKeywords = Array.isArray(keywords) ? keywords.join(', ') : keywords

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{siteTitle}</title>
      {description && <meta name="description" content={description} />}
      {finalKeywords && <meta name="keywords" content={finalKeywords} />}
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={siteTitle} />
      {description && <meta property="og:description" content={description} />}
      {image && <meta property="og:image" content={image} />}
      {url && <meta property="og:url" content={url} />}

      {/* Twitter Cards */}
      <meta name="twitter:card" content={image ? 'summary_large_image' : 'summary'} />
      <meta name="twitter:title" content={siteTitle} />
      {description && <meta name="twitter:description" content={description} />}
      {image && <meta name="twitter:image" content={image} />}
    </Helmet>
  )
}
