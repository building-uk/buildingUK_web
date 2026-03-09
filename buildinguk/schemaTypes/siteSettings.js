export const siteSettings = {
    name: 'siteSettings',
    title: 'Site Settings',
    type: 'document',
    fields: [
        {
            name: 'logo',
            title: 'Company Logo',
            type: 'image',
            description: 'Main company logo shown in Navbar, Footer, and Loader.',
            options: { hotspot: true },
        },
        {
            name: 'tagline',
            title: 'Company Tagline',
            type: 'string',
            description: 'Brief tagline shown in the footer footer.',
        },
        {
            name: 'businessStats',
            title: 'Global Business Stats',
            type: 'array',
            description: 'Centralized statistics shown across Landing, About, and Services pages.',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'value', title: 'Value', type: 'string', description: 'e.g. 25+' },
                        { name: 'label', title: 'Label', type: 'string', description: 'e.g. Years of Experience' },
                        { name: 'subLabel', title: 'Sub Label', type: 'string', description: 'Optional detail' },
                    ],
                },
            ],
        },
        {
            name: 'contactMapImage',
            title: 'Contact Section Map',
            type: 'image',
            description: 'The static map image shown in the contact section.',
            options: { hotspot: true },
        },
        {
            name: 'defaultHeroImages',
            title: 'Default Hero Slideshow',
            type: 'array',
            description: 'Fallback images for the homepage slideshow if none are provided in Landing Page.',
            of: [{ type: 'image', options: { hotspot: true } }],
        },
        {
            name: 'contactSideImage',
            title: 'Contact Sidebar Image',
            type: 'image',
            description: 'The image shown next to the contact form.',
            options: { hotspot: true },
        },
        {
            name: 'defaultPageHeroImage',
            title: 'Default Page Hero Background',
            type: 'image',
            description: 'Fallback background for internal page heroes.',
            options: { hotspot: true },
        },
        {
            name: 'testimonialsBackgroundImage',
            title: 'Testimonials Background',
            type: 'image',
            description: 'Background image for the testimonials sections.',
            options: { hotspot: true },
        },
        {
            name: 'mainNavigation',
            title: 'Main Navigation',
            type: 'array',
            description: 'Links shown in the top navigation bar.',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'label', title: 'Label', type: 'string' },
                        { name: 'path', title: 'Path', type: 'string', description: 'e.g. /about or /services' },
                    ],
                },
            ],
        },
        {
            name: 'footerLinks',
            title: 'Footer Links',
            type: 'object',
            fields: [
                {
                    name: 'mainLinks',
                    title: 'Main Links',
                    type: 'array',
                    of: [
                        {
                            type: 'object',
                            fields: [
                                { name: 'label', title: 'Label', type: 'string' },
                                { name: 'path', title: 'Path', type: 'string' },
                            ],
                        },
                    ],
                },
                {
                    name: 'infoLinks',
                    title: 'Information Links',
                    type: 'array',
                    of: [
                        {
                            type: 'object',
                            fields: [
                                { name: 'label', title: 'Label', type: 'string' },
                                { name: 'path', title: 'Path', type: 'string' },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            name: 'contactInfo',
            title: 'Contact Information',
            type: 'object',
            fields: [
                {
                    name: 'addressLines',
                    title: 'Address Lines',
                    type: 'array',
                    of: [{ type: 'string' }],
                },
                {
                    name: 'phoneNumbers',
                    title: 'Phone Numbers',
                    type: 'array',
                    of: [{ type: 'string' }],
                },
                {
                    name: 'emails',
                    title: 'Emails',
                    type: 'array',
                    of: [{ type: 'string' }],
                },
                {
                    name: 'socialLinks',
                    title: 'Social Links',
                    type: 'array',
                    of: [
                        {
                            type: 'object',
                            fields: [
                                { name: 'platform', title: 'Platform', type: 'string', options: { list: ['Instagram', 'LinkedIn', 'Facebook', 'Twitter'] } },
                                { name: 'url', title: 'URL', type: 'url' },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            name: 'seo',
            title: 'SEO & Metadata',
            type: 'object',
            fields: [
                { name: 'metaTitle', title: 'Default Meta Title', type: 'string' },
                { name: 'metaDescription', title: 'Default Meta Description', type: 'text' },
                { name: 'favicon', title: 'Favicon', type: 'image' },
            ],
        },
    ],
}
