import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { media } from 'sanity-plugin-media'
import { seoPane } from 'sanity-plugin-seo-pane'
import { schemaTypes } from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'BuildingUK',

  projectId: 'ibnvorrn',
  dataset: 'production',
  basePath: '/studio',

  cors: {
    origins: ['http://localhost:3000', 'https://buildinguk-web.sliplane.app']
  },

  plugins: [
    structureTool({
      structure: (S, context) =>
        S.list()
          .title('Content')
          .items([
            // Singleton: Site Settings
            S.listItem()
              .title('Site Settings')
              .id('siteSettings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
              ),
            S.divider(),
            // Singleton: Landing Page
            S.listItem()
              .title('Landing Page')
              .id('landingPage')
              .child(
                S.document()
                  .schemaType('landingPage')
                  .documentId('landingPage')
              ),
            // Singleton: About Page
            S.listItem()
              .title('About Page')
              .id('aboutPage')
              .child(
                S.document()
                  .schemaType('aboutPage')
                  .documentId('aboutPage')
              ),
            // Singleton: Projects Page
            S.listItem()
              .title('Projects Page')
              .id('projectsPage')
              .child(
                S.document()
                  .schemaType('projectsPage')
                  .documentId('projectsPage')
              ),
            // Singleton: Services Page
            S.listItem()
              .title('Services Page')
              .id('servicesPage')
              .child(
                S.document()
                  .schemaType('servicesPage')
                  .documentId('servicesPage')
              ),
            // Singleton: Articles Page
            S.listItem()
              .title('Articles Page')
              .id('articlesPage')
              .child(
                S.document()
                  .schemaType('articlesPage')
                  .documentId('articlesPage')
              ),
            // Singleton: Contact Page
            S.listItem()
              .title('Contact Page')
              .id('contactPage')
              .child(
                S.document()
                  .schemaType('contactPage')
                  .documentId('contactPage')
              ),
            S.divider(),
            // Regular document types
            ...S.documentTypeListItems().filter(
              (listItem) => !['siteSettings', 'landingPage', 'aboutPage', 'projectsPage', 'servicesPage', 'articlesPage', 'contactPage'].includes(listItem.getId())
            ),
          ]),
      defaultDocumentNode: (S, { schemaType }) => {
        if (['blog', 'projects', 'service', 'landingPage', 'aboutPage', 'projectsPage', 'servicesPage', 'articlesPage', 'contactPage'].includes(schemaType)) {
          return S.document().views([
            S.view.form(),
            S.view
              .component(seoPane)
              .options({
                // Required: These are used for better SEO analysis
                keywords: `seo.keywords`,
                synonyms: `seo.synonyms`,
                url: (doc) => `https://building-uk.com/${doc?.slug?.current || ''}`,
              })
              .title('SEO Preview'),
          ])
        }

        return S.document().views([S.view.form()])
      },
    }),
    visionTool(),
    media(),
  ],

  schema: {
    types: schemaTypes,
  },
})
