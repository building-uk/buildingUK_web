export const projects = {
    name: 'projects',
    title: 'Project Case Studies',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
            description: 'Keep between 20–70 characters.',
            validation: (Rule) => [
                Rule.required().error('Title is required'),
                Rule.max(70).warning('Over 70 chars — may be truncated in search results'),
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
            description: 'A brief description shown on the projects list and detail header.',
            rows: 3,
        },
        {
            name: 'category',
            title: 'Category',
            type: 'string',
            options: {
                list: [
                    { title: 'Residential', value: 'residential' },
                    { title: 'Commercial', value: 'commercial' },
                    { title: 'Restoration', value: 'restoration' },
                ],
            },
        },
        {
            name: 'services',
            title: 'Services',
            type: 'string',
        },
        {
            name: 'location',
            title: 'Location',
            type: 'string',
        },
        {
            name: 'coverImage',
            title: 'Cover Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        },
        {
            name: 'gallery',
            title: 'Gallery',
            type: 'array',
            of: [{ type: 'image', options: { hotspot: true } }],
        },
        {
            name: 'description',
            title: 'Description',
            type: 'array',
            of: [
                {
                    type: 'block',
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
                { type: 'image', options: { hotspot: true } },
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
                    description: 'Ideal: 30–60 characters. Leave blank to use the project title.',
                    validation: (Rule) => [
                        Rule.max(60).warning('Over 60 chars — Google may truncate this'),
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

