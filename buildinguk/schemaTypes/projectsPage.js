export const projectsPage = {
    name: 'projectsPage',
    title: 'Projects Page',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
            initialValue: 'Projects',
        },
        {
            name: 'heroImage',
            title: 'Hero Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        },
        {
            name: 'introTitle',
            title: 'Intro Title',
            type: 'string',
            initialValue: 'Our Work Speaks for Itself',
        },
        {
            name: 'introImage',
            title: 'Intro Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        },
        {
            name: 'introText',
            title: 'Intro Text',
            type: 'text',
        },
    ],
}
