import { client } from '../sanityClient'

/**
 * CMS Service - Connects to Sanity CMS
 */
export const cmsService = {
  // Navigation/Menu
  async getNavigation() {
    const settings = await cmsService.getSiteSettings()
    if (settings?.mainNavigation?.length) {
      return settings.mainNavigation.map(item => ({
        to: item.path,
        label: item.label
      }))
    }
    // Fallback
    return [
      { to: '/', label: 'Home' },
      { to: '/about', label: 'Company' },
      { to: '/services', label: 'Services' },
      { to: '/projects', label: 'Projects' },
      { to: '/articles', label: 'Articles' }
    ]
  },

  // Global Site Settings
  async getSiteSettings() {
    const query = `*[_type == "siteSettings"][0] {
      "logo": logo.asset->url,
      tagline,
      "contactMap": contactMapImage.asset->url,
      "contactSide": contactSideImage.asset->url,
      "defaultHeroImages": defaultHeroImages[].asset->url,
      "defaultPageHero": defaultPageHeroImage.asset->url,
      "testimonialsBackground": testimonialsBackgroundImage.asset->url,
      businessStats[] {
        value,
        label,
        subLabel
      },
      mainNavigation,
      footerLinks,
      contactInfo,
      seo {
        metaTitle,
        metaDescription,
        "favicon": favicon.asset->url
      }
    }`
    return client.fetch(query)
  },

  // Centralized helper to get global business stats
  async getGlobalStats() {
    const settings = await cmsService.getSiteSettings()
    return settings?.businessStats || []
  },

  // Hero Section (Landing)
  async getHeroContent() {
    const settings = await cmsService.getSiteSettings()
    const query = `*[_type == "landingPage"][0].hero {
      title,
      subtitle,
      "ctaText": buttonText,
      "ctaLink": buttonLink,
      "images": slideshowImages[].asset->url
    }`
    const hero = await client.fetch(query)
    return {
      ...hero,
      images: hero?.images?.length ? hero.images : (settings?.defaultHeroImages || [])
    }
  },

  // About Snippet (Landing)
  async getAboutContent() {
    const stats = await cmsService.getGlobalStats()
    const query = `*[_type == "landingPage"][0].aboutSnippet {
      "label": subtitle,
      title,
      "description": text,
      "ctaText": buttonText,
      "ctaLink": buttonLink,
      "images": images[] {
        "src": asset->url,
        "alt": "BuildingUK Quality Work"
      }
    }`
    const result = await client.fetch(query)
    return { ...result, stats }
  },

  // Services Page
  async getServicesFullPage() {
    const stats = await cmsService.getGlobalStats()
    const query = `*[_type == "servicesPage"][0] {
      "hero": {
        "title": title,
        "backgroundImage": heroImage.asset->url
      },
      "intro": {
        "label": introSubtitle,
        "headline": introTitle,
        "description": introDescription
      },
      "services": *[_type == "service"] | order(title asc) {
        "id": slug.current,
        title,
        "shortDescription": summary,
        "image": mainImage.asset->url,
        "link": "/services/" + slug.current
      },
      "whyUs": {
        "title": processTitle,
        "image": processImage.asset->url,
        "processes": processSteps[] {
          "id": title,
          title,
          description,
          "icon": icon.asset->url
        }
      }
    }`
    const result = await client.fetch(query)
    return { ...result, stats }
  },

  // Simplified services for landing page
  async getServices() {
    const query = `*[_type == "service"] | order(title asc) {
      "id": slug.current,
      title,
      "shortDescription": summary,
      "image": mainImage.asset->url,
      "link": "/services/" + slug.current
    }`
    return client.fetch(query)
  },

  async getServiceById(id) {
    const query = `*[_type == "service" && (slug.current == $id || _id == $id)][0] {
      _id,
      title,
      "shortDescription": summary,
      "image": mainImage.asset->url,
      "heroImage": mainImage.asset->url,
      "description": array::join(content[].children[].text, "\n\n"),
      sections
    }`
    return client.fetch(query, { id })
  },

  // Projects Page
  async getProjectsFullPage() {
    const query = `*[_type == "projectsPage"][0] {
      "hero": {
        "title": title,
        "backgroundImage": heroImage.asset->url
      },
      "intro": {
        "title": introTitle,
        "description": introText,
        "image": introImage.asset->url
      }
    }`
    const pageData = await client.fetch(query)
    const projects = await cmsService.getProjects()
    const testimonials = await cmsService.getTestimonials()

    return {
      hero: pageData?.hero,
      intro: pageData?.intro,
      projects,
      testimonials,
      contact: await cmsService.getContactInfo()
    }
  },

  // All Projects
  async getProjects() {
    const query = `*[_type == "projects"] | order(_createdAt desc) {
      "id": slug.current,
      title,
      category,
      location,
      "image": coverImage.asset->url,
      "shortDescription": summary,
      "description": description
    }`
    return client.fetch(query)
  },

  // Featured Projects
  async getFeaturedProjects(limit = 3) {
    const query = `*[_type == "landingPage"][0].featuredProjects[]-> {
      "id": slug.current,
      title,
      category,
      location,
      "image": coverImage.asset->url,
      "shortDescription": summary
    }`
    const featured = await client.fetch(query)
    if (featured?.length) return featured
    return (await cmsService.getProjects()).slice(0, limit)
  },

  async getProjectById(id) {
    const query = `*[_type == "projects" && (slug.current == $id || _id == $id)][0] {
      "id": slug.current,
      title,
      category,
      location,
      services,
      "image": coverImage.asset->url,
      "images": gallery[].asset->url,
      "shortDescription": summary,
      "description": description
    }`
    return client.fetch(query, { id })
  },

  // Articles Page
  async getArticlesFullPage() {
    const query = `*[_type == "articlesPage"][0] {
      "hero": {
        "title": title,
        "backgroundImage": heroImage.asset->url
      },
      "intro": {
        "text": introText
      }
    }`
    const pageData = await client.fetch(query)
    const articles = await cmsService.getArticles()

    return {
      hero: pageData?.hero,
      intro: pageData?.intro,
      articles,
      contact: await cmsService.getContactInfo()
    }
  },

  // All Articles
  async getArticles() {
    const query = `*[_type == "blog"] | order(publishedAt desc) {
      "id": slug.current,
      title,
      category,
      "date": publishedAt,
      author,
      "image": mainImage.asset->url,
      "excerpt": blurb,
      "content": body
    }`
    return client.fetch(query)
  },

  // Latest articles for landing page
  async getLatestArticles(limit = 3) {
    const query = `*[_type == "blog"] | order(publishedAt desc)[0...${limit}] {
      "id": slug.current,
      title,
      category,
      "date": publishedAt,
      author,
      "image": mainImage.asset->url,
      "excerpt": blurb
    }`
    return client.fetch(query)
  },

  // Individual Article
  async getArticleById(id) {
    const query = `*[_type == "blog" && (slug.current == $id || _id == $id)][0] {
      "id": slug.current,
      title,
      category,
      "date": publishedAt,
      author,
      "image": mainImage.asset->url,
      "excerpt": blurb,
      "content": body,
      "relatedIds": [] // Could be implemented with references
    }`
    return client.fetch(query, { id })
  },

  // Testimonials
  async getTestimonials() {
    const query = `*[_type == "testimonial"] {
      "id": _id,
      name,
      designation,
      "text": quote,
      rating
    }`
    return client.fetch(query)
  },

  // Processes (Why Us)
  async getProcesses() {
    const query = `*[_type == "servicesPage"][0] {
      "processes": processSteps[] {
        "id": title,
        title,
        description,
        "icon": icon.asset->url
      },
      "image": processImage.asset->url
    }`
    return client.fetch(query)
  },

  // About Page Full
  async getAboutFullContent() {
    const stats = await cmsService.getGlobalStats()
    const query = `*[_type == "aboutPage"][0] {
      "hero": {
        "title": title,
        "backgroundImage": heroImage.asset->url
      },
      "intro": {
        "label": introSection.subtitle,
        "headline": introSection.title,
        "paragraphs": [introSection.text],
        "image": introSection.mainImage.asset->url,
        "ctaText": introSection.buttonText,
        "ctaLink": introSection.buttonLink || "/services"
      },
      "gallery": teamGallery[].asset->url,
      "whyChooseUs": {
        "label": reliabilitySection.subtitle,
        "title": reliabilitySection.title,
        "paragraphs": [reliabilitySection.text]
      },
      "team": {
        "label": mdSection.subtitle,
        "title": mdSection.title,
        "description": mdSection.mdBio,
        "image": mdSection.mdImage.asset->url
      },
      "testimonials": featuredTestimonials[]-> {
        "id": _id,
        name,
        "text": quote,
        "designation": designation
      }
    }`
    const result = await client.fetch(query)
    const settings = await cmsService.getSiteSettings()

    return {
      ...result,
      whyChooseUs: { ...result?.whyChooseUs, stats },
      testimonialsBackground: settings?.testimonialsBackground,
      contact: await cmsService.getContactInfo()
    }
  },

  async getContactInfo() {
    const settings = await cmsService.getSiteSettings()
    const contactInfo = settings?.contactInfo

    return {
      address: {
        lines: contactInfo?.addressLines || ["5th Floor, 167-169 Great Portland Street", "London W1W 5PF"]
      },
      contact: {
        lines: contactInfo?.phoneNumbers && contactInfo?.emails ?
          [...contactInfo.phoneNumbers, ...contactInfo.emails] :
          ["+44 787 920 8628", "info@building.uk.com"]
      },
      social: contactInfo?.socialLinks || [
        { platform: 'Instagram', url: 'https://instagram.com' },
        { platform: 'LinkedIn', url: 'https://linkedin.com' }
      ],
      mapImage: settings?.contactMap || "/images/contact-map.png",
      sideImage: settings?.contactSide || "/images/contact-side.jpg",
      heroImage: settings?.defaultPageHero || "/images/contact-hero-bg.jpg"
    }
  },

  async getFooterLinks() {
    const settings = await cmsService.getSiteSettings()
    const footerLinks = settings?.footerLinks

    return {
      main: (footerLinks?.mainLinks || [
        { to: '/', label: 'Home' },
        { to: '/about', label: 'Company' },
        { to: '/services', label: 'Services' },
        { to: '/projects', label: 'Projects' },
        { to: '/articles', label: 'Blog' },
        { to: '/contact', label: 'Contact Us' }
      ]).map(item => ({ ...item, to: item.path || item.to })),
      info: (footerLinks?.infoLinks || [
        { to: '/terms', label: 'Terms and conditions' },
        { to: '/privacy', label: 'Privacy Policy' },
        { to: '/health-safety', label: 'Health & Safety' }
      ]).map(item => ({ ...item, to: item.path || item.to }))
    }
  },

  async submitContactForm(formData) {
    const payload = {
      access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY,
      subject: `New Contact Form Submission from ${formData.name}`,
      from_name: 'BuildingUK Website',
      name: formData.name,
      email: formData.email,
      message: formData.message,
    }

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    const data = await response.json()

    if (data.success) {
      return { success: true, message: 'Message sent successfully!' }
    } else {
      throw new Error(data.message || 'Failed to send message. Please try again.')
    }
  },

  async subscribeNewsletter(email) {
    console.log('📬 Newsletter:', email)
    return { success: true, message: 'Successfully subscribed!' }
  }
}
