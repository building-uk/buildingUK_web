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
                { name: 'text', title: 'Intro Text', type: 'text' },
                { name: 'mainImage', title: 'Main Intro Image', type: 'image', options: { hotspot: true } },
                { name: 'buttonText', title: 'Button Text', type: 'string', initialValue: 'OUR SERVICES' },
                { name: 'buttonLink', title: 'Button Link', type: 'string', initialValue: '/services' },
            ],
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
                { name: 'text', title: 'Description', type: 'text' },
            ],
        },
        {
            name: 'mdSection',
            title: 'MD / Meet the Team Section',
            type: 'object',
            fields: [
                { name: 'subtitle', title: 'Subtitle', type: 'string', initialValue: 'MEET THE TEAM' },
                { name: 'title', title: 'Title', type: 'string', initialValue: 'Creating spaces with thoughtful craftsmanship.' },
                { name: 'mdImage', title: 'MD Image', type: 'image', options: { hotspot: true } },
                { name: 'mdBio', title: 'MD Bio', type: 'text' },
            ],
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
