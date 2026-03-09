export const articlesPage = {
    name: 'articlesPage',
    title: 'Articles Page',
    type: 'document',
    description: 'This singleton manages the header and description of the Articles landing page. All Blog posts will automatically appear in the list view on the frontend.',
    fields: [
        {
            name: 'title',
            title: 'Page Title',
            type: 'string',
            initialValue: 'Articles & News',
        },
        {
            name: 'heroImage',
            title: 'Hero Image',
            type: 'image',
            options: { hotspot: true },
        },
        {
            name: 'introText',
            title: 'Intro Text',
            type: 'string',
            initialValue: 'Discover our latest guides, tips, and project highlights.',
        },
    ],
}
