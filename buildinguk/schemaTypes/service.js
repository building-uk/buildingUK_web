export const service = {
    name: 'service',
    title: 'Service',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
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
    ],
}
