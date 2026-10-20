import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createClient } from '@sanity/client'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.resolve(__dirname, 'dist')
const indexHtmlPath = path.resolve(distDir, 'index.html')

const DOMAIN = 'https://www.building.uk.com'

// Connect to Sanity
const client = createClient({
  projectId: process.env.VITE_SANITY_PROJECT_ID || 'ibnvorrn',
  dataset: process.env.VITE_SANITY_DATASET || 'production',
  useCdn: false,
  apiVersion: process.env.VITE_SANITY_API_VERSION || '2024-03-01',
})

// Static pages configuration
const staticPages = [
  {
    path: '/',
    title: 'Home Renovation & Refurbishment Central London | BuildingUK',
    description:
      'Female-led, Which? Trusted Trader builders in Central London. Home renovation and refurbishment from small repairs to full projects, plus fire door services.',
  },
  {
    path: '/about',
    title: 'About Us | BuildingUK',
    description:
      'Learn about BuildingUK, a female-led, Which? Trusted Trader builder specialising in residential refurbishment and fire door services in Central London.',
  },
  {
    path: '/services',
    title: 'Our Services | BuildingUK',
    description:
      'Considered residential refurbishment, fire door installation, kitchen design, and home maintenance across Central London.',
  },
  {
    path: '/projects',
    title: 'Our Projects | BuildingUK',
    description:
      'Explore our portfolio of considered residential renovations, refurbishments and restoration projects across Central London.',
  },
  {
    path: '/articles',
    title: 'Articles & Insights | BuildingUK',
    description:
      'Expert advice, practical guides and renovation insights from our team of builders in Central London.',
  },
  {
    path: '/contact',
    title: 'Contact Us | BuildingUK',
    description:
      'Get in touch with BuildingUK for your home renovation, flat refurbishment, or fire door enquiry in Central London.',
  },
  {
    path: '/terms',
    title: 'Terms and Conditions | BuildingUK',
    description: 'Terms and conditions for BuildingUK building and renovation services.',
  },
  {
    path: '/privacy',
    title: 'Privacy Policy | BuildingUK',
    description: 'Privacy policy for BuildingUK website and customer data.',
  },
  {
    path: '/health-safety',
    title: 'Health & Safety | BuildingUK',
    description: 'Our health and safety standards, protocols and commitments at BuildingUK.',
  },
  {
    path: '/our-commitments',
    title: 'Our Commitments | BuildingUK',
    description: 'BuildingUK commitments to quality, reliability, transparency and sustainability.',
  },
]

function cleanString(str) {
  if (!str) return ''
  return String(str).trim()
}

function escapeHtml(str) {
  if (!str) return ''
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

async function fetchDynamicRoutes() {
  const [services, articles, projects] = await Promise.all([
    client.fetch('*[_type == "service"] { "slug": slug.current, title, summary, seo }'),
    client.fetch('*[_type == "blog"] { "slug": slug.current, title, blurb, seo, author, publishedAt, "image": mainImage.asset->url }'),
    client.fetch('*[_type == "projects"] { "slug": slug.current, title, summary, seo, location }'),
  ])

  const dynamicPages = []

  // Services
  for (const s of services || []) {
    if (!s.slug) continue
    const title = cleanString(s.seo?.metaTitle || (s.title.includes('BuildingUK') ? s.title : `${s.title} | BuildingUK`))
    const description = cleanString(
      s.seo?.metaDescription ||
      s.summary ||
      `Explore our professional ${s.title} services in Central London with BuildingUK.`
    )
    dynamicPages.push({
      path: `/services/${s.slug}`,
      title,
      description,
      schema: {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: cleanString(s.title),
        provider: {
          '@type': 'Organization',
          name: 'BuildingUK',
          url: DOMAIN,
        },
        description,
      },
    })
  }

  // Articles
  for (const a of articles || []) {
    if (!a.slug) continue
    const title = cleanString(a.seo?.metaTitle || (a.title.includes('BuildingUK') ? a.title : `${a.title} | BuildingUK`))
    const description = cleanString(
      a.seo?.metaDescription ||
      a.blurb ||
      `Read our article on ${a.title}. Renovation insights from BuildingUK.`
    )
    const canonicalUrl = `${DOMAIN}/articles/${a.slug}`
    dynamicPages.push({
      path: `/articles/${a.slug}`,
      title,
      description,
      type: 'article',
      image: a.image,
      schema: {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: cleanString(a.title),
        url: canonicalUrl,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': canonicalUrl,
        },
        image: a.image || undefined,
        author: {
          '@type': 'Person',
          name: cleanString(a.author) || 'BuildingUK Team',
        },
        publisher: {
          '@type': 'Organization',
          name: 'BuildingUK',
          logo: {
            '@type': 'ImageObject',
            url: `${DOMAIN}/images/BuildingUK-LogoMark.png`,
          },
        },
        datePublished: a.publishedAt,
        description,
      },
    })
  }

  // Projects
  for (const p of projects || []) {
    if (!p.slug) continue
    const title = cleanString(p.seo?.metaTitle || (p.title.includes('BuildingUK') ? p.title : `${p.title} | BuildingUK`))
    const description = cleanString(
      p.seo?.metaDescription ||
      p.summary ||
      `Case study detailing BuildingUK's work on ${p.title} in ${p.location || 'Central London'}.`
    )
    dynamicPages.push({
      path: `/projects/${p.slug}`,
      title,
      description,
    })
  }

  return dynamicPages
}

function renderHtmlForPage(template, page) {
  const canonicalUrl = `${DOMAIN}${page.path === '/' ? '/' : page.path}`
  const siteTitle = escapeHtml(page.title)
  const siteDesc = escapeHtml(page.description)
  const ogType = page.type || 'website'
  const ogImage = page.image || `${DOMAIN}/images/og-image.jpg`

  // Strip any pre-existing title, description, canonical, or og tags from template
  let html = template
    .replace(/<title>.*?<\/title>/gis, '')
    .replace(/<meta\s+name=["']description["'][^>]*>/gis, '')
    .replace(/<link\s+rel=["']canonical["'][^>]*>/gis, '')
    .replace(/<meta\s+property=["']og:title["'][^>]*>/gis, '')
    .replace(/<meta\s+property=["']og:description["'][^>]*>/gis, '')
    .replace(/<meta\s+property=["']og:url["'][^>]*>/gis, '')
    .replace(/<meta\s+property=["']og:type["'][^>]*>/gis, '')
    .replace(/<meta\s+property=["']og:image["'][^>]*>/gis, '')
    .replace(/<meta\s+name=["']twitter:title["'][^>]*>/gis, '')
    .replace(/<meta\s+name=["']twitter:description["'][^>]*>/gis, '')
    .replace(/<meta\s+name=["']twitter:image["'][^>]*>/gis, '')

  // Build clean SEO tags block (GUARANTEED exactly ONE canonical tag)
  const seoHeadTags = [
    `  <title>${siteTitle}</title>`,
    `  <meta name="description" content="${siteDesc}" />`,
    `  <link rel="canonical" href="${canonicalUrl}" />`,
    `  <meta property="og:type" content="${ogType}" />`,
    `  <meta property="og:url" content="${canonicalUrl}" />`,
    `  <meta property="og:title" content="${siteTitle}" />`,
    `  <meta property="og:description" content="${siteDesc}" />`,
    `  <meta property="og:image" content="${ogImage}" />`,
    `  <meta name="twitter:title" content="${siteTitle}" />`,
    `  <meta name="twitter:description" content="${siteDesc}" />`,
    `  <meta name="twitter:image" content="${ogImage}" />`,
  ]

  if (page.schema) {
    seoHeadTags.push(
      `  <script type="application/ld+json">${JSON.stringify(page.schema)}</script>`
    )
  }

  // Inject right after <head>
  html = html.replace(/<head>/i, `<head>\n${seoHeadTags.join('\n')}`)
  return html
}

async function prerender() {
  if (!fs.existsSync(indexHtmlPath)) {
    console.error(`Error: Base template not found at ${indexHtmlPath}. Run build first.`)
    process.exit(1)
  }

  const baseTemplate = fs.readFileSync(indexHtmlPath, 'utf8')
  console.log('🔄 Fetching dynamic pages from Sanity...')
  const dynamicPages = await fetchDynamicRoutes()
  const allPages = [...staticPages, ...dynamicPages]

  console.log(`🚀 Pre-rendering ${allPages.length} pages...`)

  for (const page of allPages) {
    const renderedHtml = renderHtmlForPage(baseTemplate, page)
    let outPath
    if (page.path === '/') {
      outPath = indexHtmlPath
    } else {
      const pageDir = path.join(distDir, page.path)
      fs.mkdirSync(pageDir, { recursive: true })
      outPath = path.join(pageDir, 'index.html')
    }
    fs.writeFileSync(outPath, renderedHtml, 'utf8')
  }

  console.log('✅ Pre-rendering complete! Verifying canonical tags on all pages...')

  // Self-verification: Check that every single generated HTML has EXACTLY ONE canonical tag
  let totalFiles = 0
  let passedFiles = 0

  function verifyDir(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true })
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        verifyDir(fullPath)
      } else if (entry.name === 'index.html') {
        totalFiles++
        const content = fs.readFileSync(fullPath, 'utf8')
        const matches = content.match(/<link\s+rel=["']canonical["'][^>]*>/gi) || []
        const relPath = path.relative(distDir, fullPath)
        if (matches.length !== 1) {
          console.error(`❌ FAILED: ${relPath} has ${matches.length} canonical tags!`)
        } else {
          passedFiles++
          // Extract the href
          const hrefMatch = matches[0].match(/href=["'](.*?)["']/i)
          const href = hrefMatch ? hrefMatch[1] : 'unknown'
          console.log(`  ✓ ${relPath.padEnd(45)} -> canonical: ${href}`)
        }
      }
    }
  }

  verifyDir(distDir)

  if (passedFiles === totalFiles) {
    console.log(`\n🎉 SUCCESS: All ${passedFiles}/${totalFiles} pre-rendered pages have EXACTLY ONE unique canonical tag!`)
  } else {
    console.error(`\n❌ ERROR: ${totalFiles - passedFiles} pages failed canonical tag validation!`)
    process.exit(1)
  }
}

prerender().catch((err) => {
  console.error('Pre-rendering failed:', err)
  process.exit(1)
})
