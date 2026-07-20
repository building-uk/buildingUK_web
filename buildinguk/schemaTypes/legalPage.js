export const legalPage = {
  name: 'legalPage',
  title: 'Legal & Info Pages',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
      description: 'e.g., Privacy Policy, Terms & Conditions',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'heroImage',
      title: 'Hero Background Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        { type: 'block' },
        { 
          type: 'image', 
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
              description: 'Important for SEO and accessibility.',
            }
          ]
        },
        {
          name: 'imageGallery',
          type: 'object',
          title: 'Image Row (Gallery)',
          fields: [
            {
              name: 'images',
              type: 'array',
              title: 'Images',
              of: [
                {
                  type: 'image',
                  options: { hotspot: true },
                  fields: [
                    { name: 'alt', type: 'string', title: 'Alt text' }
                  ]
                }
              ],
              options: {
                layout: 'grid',
              },
            }
          ]
        }
      ],
    },
    {
      name: 'lastUpdated',
      title: 'Last Updated',
      type: 'date',
    },
  ],
}
