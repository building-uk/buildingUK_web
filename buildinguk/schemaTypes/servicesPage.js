export const servicesPage = {
    name: 'servicesPage',
    title: 'Services Page',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Page Title',
            type: 'string',
            initialValue: 'Services',
        },
        {
            name: 'heroImage',
            title: 'Hero Image',
            type: 'image',
            options: { hotspot: true },
        },
        {
            name: 'introSubtitle',
            title: 'Intro Subtitle',
            type: 'string',
            initialValue: 'OUR SERVICES',
        },
        {
            name: 'introTitle',
            title: 'Intro Title',
            type: 'string',
            initialValue: 'Expert Solutions for Every Space',
        },
        {
            name: 'introDescription',
            title: 'Intro Description',
            type: 'text',
        },
        {
            name: 'servicesList',
            title: 'Services List',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
                        { name: 'title', title: 'Title', type: 'string' },
                        { name: 'description', title: 'Description', type: 'text' },
                        { name: 'buttonText', title: 'Button Text', type: 'string', initialValue: 'EXPLORE SERVICES' },
                    ],
                },
            ],
        },
        {
            name: 'processTitle',
            title: 'Process Section Title',
            type: 'string',
            initialValue: 'A Process Built on Excellence',
        },
        {
            name: 'processImage',
            title: 'Process Section Image',
            type: 'image',
            options: { hotspot: true },
        },
        {
            name: 'processSteps',
            title: 'Process Steps',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'icon', title: 'Icon', type: 'image' },
                        { name: 'title', title: 'Title', type: 'string' },
                        { name: 'description', title: 'Description', type: 'text' },
                    ],
                },
            ],
        },
    ],
}
