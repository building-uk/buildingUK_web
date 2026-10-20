export const service = {
    name: 'service',
    title: 'Service',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
            description: 'Keep between 20–70 characters.',
            validation: (Rule) => [
                Rule.required().error('Title is required'),
                Rule.max(70).warning('Title is over 70 characters — may be truncated in search results'),
                Rule.min(10).warning('Title seems too short'),
            ],
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
        },
        {
            name: 'summary',
            title: 'Short Summary',
            type: 'text',
            description: 'A brief description shown on the header of the service page.',
        },
        {
            name: 'mainImage',
            title: 'Main Image',
            type: 'image',
            options: { hotspot: true },
        },
        {
            name: 'content',
            title: 'Detailed Content',
            type: 'array',
            of: [
                {
                    type: 'block',
                    styles: [
                        { title: 'Normal', value: 'normal' },
                        { title: 'H2', value: 'h2' },
                        { title: 'H3', value: 'h3' },
                        { title: 'Quote', value: 'blockquote' },
                    ],
                    lists: [{ title: 'Bullet', value: 'bullet' }],
                    marks: {
                        decorators: [
                            { title: 'Strong', value: 'strong' },
                            { title: 'Emphasis', value: 'em' },
                        ],
                        annotations: [
                            {
                                name: 'link',
                                type: 'object',
                                title: 'Link',
                                fields: [
                                    {
                                        name: 'href',
                                        type: 'url',
                                        title: 'URL',
                                        validation: (Rule) =>
                                            Rule.uri({
                                                allowRelative: true,
                                                scheme: ['http', 'https', 'mailto', 'tel'],
                                            }),
                                    },
                                ],
                            },
                        ],
                    },
                },
                {
                    type: 'image',
                    options: { hotspot: true },
                },
            ],
        },
        {
            name: 'sections',
            title: 'Additional Sections',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'title', title: 'Section Title', type: 'string' },
                        { name: 'content', title: 'Section Content', type: 'text' },
                        { name: 'afterContent', title: 'Additional Text', type: 'text' },
                        { name: 'list', title: 'Bullet Points', type: 'array', of: [{ type: 'string' }] },
                    ],
                },
            ],
        },
        {
            name: 'seo',
            title: 'SEO & Metadata',
            type: 'object',
            fields: [
                {
                    name: 'metaTitle',
                    title: 'Meta Title',
                    type: 'string',
                    description: 'Ideal: 30–60 characters. Leave blank to use the page title.',
                    validation: (Rule) => [
                        Rule.max(60).warning('Over 60 chars — Google may truncate this'),
                        Rule.min(10).warning('Too short for a useful meta title'),
                    ],
                },
                {
                    name: 'metaDescription',
                    title: 'Meta Description',
                    type: 'text',
                    description: 'Ideal: 120–158 characters.',
                    validation: (Rule) => [
                        Rule.max(160).warning('Over 160 chars — will be cut off in search results'),
                        Rule.min(50).warning('Too short — aim for at least 50 characters'),
                    ],
                },
            ],
        },
    ],
}

