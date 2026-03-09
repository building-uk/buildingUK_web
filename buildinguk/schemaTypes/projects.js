export const projects = {
    name: 'projects',
    title: 'Project Case Studies',
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
                { type: 'block' },
                { type: 'image', options: { hotspot: true } }
            ],
        },
    ],
}
