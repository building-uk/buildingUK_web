// Helper: extract plain text from a portable text block array or string
const blockToPlainText = (blocks = []) => {
    if (!Array.isArray(blocks)) return typeof blocks === 'string' ? blocks : ''
    return blocks.map(b => (b.children || []).map(c => c.text || '').join('')).join(' ')
}

export const landingPage = {
    name: 'landingPage',
    title: 'Landing Page',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Page Title',
            type: 'string',
            initialValue: 'Home',
        },
        {
            name: 'hero',
            title: 'Hero Section',
            type: 'object',
            fields: [
                { name: 'title', title: 'Title', type: 'string' },
                { name: 'subtitle', title: 'Subtitle', type: 'string' },
                {
                    name: 'slideshowImages',
                    title: 'Slideshow Images',
                    type: 'array',
                    of: [{ type: 'image', options: { hotspot: true } }],
                    validation: (Rule) => Rule.min(4).error('Please add at least 4 images for the hero slideshow.'),
                },
                { name: 'buttonText', title: 'Button Text', type: 'string' },
                { name: 'buttonLink', title: 'Button Link', type: 'string', initialValue: '/contact' },
            ],
        },
        {
            name: 'accreditationSection',
            title: 'Accreditation Section',
            type: 'object',
            description: 'Accredited & Vetted section placed right after the Hero, before About Us.',
            fields: [
                {
                    name: 'subtitle',
                    title: 'Subtitle / Tag',
                    type: 'string',
                    initialValue: 'ACCREDITED & VETTED',
                },
                {
                    name: 'title',
                    title: 'Title',
                    type: 'string',
                    initialValue: 'Trusted by Londoners. Backed by the Industry.',
                },
                {
                    name: 'description',
                    title: 'Description',
                    type: 'array',
                    of: [{ type: 'block' }],
                    description: 'Rich text editor with hyperlinks, bold, etc.',
                },
                {
                    name: 'badges',
                    title: 'Accreditation Badges',
                    type: 'array',
                    of: [
                        {
                            type: 'object',
                            fields: [
                                {
                                    name: 'name',
                                    title: 'Accreditation Name',
                                    type: 'string',
                                    description: 'e.g. Which? Trusted Trader',
                                },
                                {
                                    name: 'logo',
                                    title: 'Badge Image / Logo',
                                    type: 'image',
                                    options: { hotspot: true },
                                },
                                {
                                    name: 'caption',
                                    title: 'Caption / Subtitle',
                                    type: 'string',
                                    description: 'e.g. Independently vetted for quality and customer service',
                                },
                                {
                                    name: 'url',
                                    title: 'Website Link (Optional)',
                                    type: 'url',
                                },
                            ],
                            preview: {
                                select: {
                                    title: 'name',
                                    subtitle: 'caption',
                                    media: 'logo',
                                },
                            },
                        },
                    ],
                },
            ],
            preview: {
                select: { title: 'title', subtitle: 'subtitle' },
                prepare({ title, subtitle }) {
                    return {
                        title: title || 'Accreditation Section',
                        subtitle: subtitle || 'ACCREDITED & VETTED',
                    }
                },
            },
        },
        {
            name: 'aboutSnippet',
            title: 'About Snippet',
            type: 'object',
            fields: [
                { name: 'subtitle', title: 'Subtitle', type: 'string', initialValue: 'About Us' },
                { name: 'title', title: 'Title', type: 'string' },
                {
                    name: 'text',
                    title: 'Description',
                    type: 'array',
                    of: [{ type: 'block' }],
                    description: 'Rich text editor with hyperlinks, bold, lists, etc.'
                },
                { name: 'images', title: 'Images', type: 'array', of: [{ type: 'image' }] },
                { name: 'buttonText', title: 'Button Text', type: 'string', initialValue: 'Learn More' },
                { name: 'buttonLink', title: 'Button Link', type: 'string', initialValue: '/about' },
            ],
            preview: {
                select: { title: 'title', text: 'text' },
                prepare({ title, text }) {
                    return {
                        title: title || 'About Snippet',
                        subtitle: text ? blockToPlainText(text).slice(0, 80) : ''
                    }
                }
            }
        },
        {
            name: 'featuredServices',
            title: 'Featured Services',
            type: 'array',
            of: [{ type: 'reference', to: { type: 'service' } }],
            description: 'Select services to showcase on the home page.',
        },
        {
            name: 'featuredProjects',
            title: 'Featured Case Studies',
            type: 'array',
            of: [{ type: 'reference', to: { type: 'projects' } }],
            description: 'Select project case studies to showcase.',
        },
        {
            name: 'processSnippet',
            title: 'Process Section',
            type: 'object',
            fields: [
                { name: 'title', title: 'Section Title', type: 'string' },
                { name: 'image', title: 'Illustration/Image', type: 'image' },
            ],
            description: 'Process steps are managed in the Services Page settings.',
        },
        {
            name: 'latestArticlesTitle',
            title: 'Latest Articles Section Title',
            type: 'string',
            initialValue: 'Latest Articles & Updates',
        },
        {
            name: 'featuredTestimonials',
            title: 'Featured Testimonials',
            type: 'array',
            of: [{ type: 'reference', to: { type: 'testimonial' } }],
        },
        {
            name: 'contactIntro',
            title: 'Contact Section Intro',
            type: 'object',
            fields: [
                { name: 'subtitle', title: 'Subtitle', type: 'string', initialValue: 'Contact Us' },
                { name: 'title', title: 'Headline', type: 'string', initialValue: 'Start the conversation' },
            ],
        },
    ],
}
