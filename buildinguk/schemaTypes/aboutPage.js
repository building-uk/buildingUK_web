// Helper: extract plain text from a portable text block array
const blockToPlainText = (blocks = []) =>
    blocks.map(b => (b.children || []).map(c => c.text || '').join('')).join(' ')

export const aboutPage = {
    name: 'aboutPage',
    title: 'About Page',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Page Title',
            type: 'string',
            initialValue: 'About Us',
        },
        {
            name: 'heroImage',
            title: 'Hero Image',
            type: 'image',
            options: { hotspot: true },
        },
        {
            name: 'introSection',
            title: 'Intro Section',
            type: 'object',
            fields: [
                { name: 'subtitle', title: 'Subtitle', type: 'string', initialValue: 'ABOUT US' },
                { name: 'title', title: 'Title', type: 'string', initialValue: 'We transform spaces with seamless, high-quality renovations and restorations.' },
                {
                    name: 'text',
                    title: 'Intro Text',
                    type: 'array',
                    of: [{ type: 'block' }],
                    description: 'Rich text editor with hyperlinks, bold, lists, etc.'
                },
                { name: 'mainImage', title: 'Main Intro Image', type: 'image', options: { hotspot: true } },
                { name: 'buttonText', title: 'Button Text', type: 'string', initialValue: 'OUR SERVICES' },
                { name: 'buttonLink', title: 'Button Link', type: 'string', initialValue: '/services' },
            ],
            preview: {
                select: { title: 'title', text: 'text' },
                prepare({ title, text }) {
                    return {
                        title: title || 'Intro Section',
                        subtitle: text ? blockToPlainText(text).slice(0, 80) : ''
                    }
                }
            }
        },
        {
            name: 'teamGallery',
            title: 'Team & Process Gallery',
            type: 'array',
            of: [{ type: 'image', options: { hotspot: true } }],
            description: 'The three images showing the team, van, and scaffolding.',
        },
        {
            name: 'reliabilitySection',
            title: 'Reliability Section (Why Choose Us)',
            type: 'object',
            fields: [
                { name: 'subtitle', title: 'Subtitle', type: 'string', initialValue: 'WHY CHOOSE US' },
                { name: 'title', title: 'Title', type: 'string', initialValue: 'Your project deserves reliability — and we deliver it.' },
                {
                    name: 'text',
                    title: 'Description',
                    type: 'array',
                    of: [{ type: 'block' }],
                    description: 'Rich text editor with hyperlinks, bold, lists, etc.'
                },
                {
                    name: 'stats',
                    title: 'Statistics',
                    type: 'array',
                    description: 'Custom stats for this section (e.g. Years of Experience).',
                    of: [
                        {
                            type: 'object',
                            fields: [
                                { name: 'value', title: 'Value', type: 'string' },
                                { name: 'label', title: 'Label', type: 'string' }
                            ]
                        }
                    ]
                }
            ],
            preview: {
                select: { title: 'title', text: 'text' },
                prepare({ title, text }) {
                    return {
                        title: title || 'Why Choose Us',
                        subtitle: text ? blockToPlainText(text).slice(0, 80) : ''
                    }
                }
            }
        },
        {
            name: 'mdSection',
            title: 'MD / Meet the Team Section',
            type: 'object',
            fields: [
                { name: 'subtitle', title: 'Subtitle', type: 'string', initialValue: 'MEET THE TEAM' },
                { name: 'title', title: 'Title', type: 'string', initialValue: 'Creating spaces with thoughtful craftsmanship.' },
                { name: 'mdImage', title: 'MD Image', type: 'image', options: { hotspot: true } },
                {
                    name: 'mdBio',
                    title: 'MD Bio',
                    type: 'array',
                    of: [{ type: 'block' }],
                    description: 'Rich text editor with hyperlinks, bold, lists, etc.'
                },
            ],
            preview: {
                select: { title: 'title', text: 'mdBio' },
                prepare({ title, text }) {
                    return {
                        title: title || 'Meet the Team',
                        subtitle: text ? blockToPlainText(text).slice(0, 80) : ''
                    }
                }
            }
        },
        {
            name: 'featuredTestimonials',
            title: 'Featured Testimonials',
            type: 'array',
            of: [{ type: 'reference', to: { type: 'testimonial' } }],
            description: 'Select specific client reviews to appear on the About page.',
        },
        {
            name: 'testimonialsTitle',
            title: 'Testimonials Section Title',
            type: 'string',
            initialValue: 'Real Experiences. Real Results.',
        },
    ],
}
