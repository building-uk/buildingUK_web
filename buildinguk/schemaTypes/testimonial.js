export const testimonial = {
    name: 'testimonial',
    title: 'Testimonials',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Name',
            type: 'string',
        },
        {
            name: 'designation',
            title: 'Designation / Title',
            type: 'string',
            description: 'e.g. Homeowner, Architect, etc.',
        },
        {
            name: 'quote',
            title: 'Quote',
            type: 'text',
        },
        {
            name: 'rating',
            title: 'Rating',
            type: 'number',
            description: '1 to 5 stars',
            initialValue: 5,
        },
    ],
}
