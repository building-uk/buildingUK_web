export const contactPage = {
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Contact Us',
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
      name: 'introTitle',
      title: 'Intro Title',
      type: 'string',
      initialValue: 'Get In Touch',
    },
    {
      name: 'introText',
      title: 'Intro Text',
      type: 'text',
      initialValue: 'We are here to help you with your next project. Reach out to us using the form below or through our contact information.',
    },
    {
      name: 'formTitle',
      title: 'Form Title',
      type: 'string',
      initialValue: 'Send Us a Message',
    },
    {
      name: 'mapImage',
      title: 'Map Image (Fallback)',
      type: 'image',
      description: 'Image to show if the interactive map is not used.',
    },
    {
      name: 'sideImage',
      title: 'Side Image',
      type: 'image',
      description: 'Image shown next to the contact details.',
    },
    {
      name: 'faqs',
      title: 'Frequently Asked Questions',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'question', title: 'Question', type: 'string' },
            { name: 'answer', title: 'Answer', type: 'text' },
          ],
        },
      ],
    },
  ],
}
