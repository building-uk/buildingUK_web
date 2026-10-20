export const blog = {
  name: 'blog',
  title: 'Blog',
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
      name: 'blurb',
      title: 'Blurb',
      type: 'text',
      description: 'A short summary of the blog post shown in the list view.',
      rows: 3,
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Insights', value: 'insights' },
          { title: 'Guides', value: 'guides' },
          { title: 'Projects', value: 'projects' },
          { title: 'Updates', value: 'updates' },
        ],
      },
    },
    {
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'author',
      title: 'Author',
      type: 'string',
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    },
    {
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        {
          type: 'block',
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Code', value: 'code' },
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
      name: 'seo',
      title: 'SEO & Metadata',
      type: 'object',
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          description: 'Ideal: 30–60 characters. Leave blank to use the article title.',
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