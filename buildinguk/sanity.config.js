import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
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
      structure: (S) =>
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
            S.divider(),
            // Regular document types
            ...S.documentTypeListItems().filter(
              (listItem) => !['siteSettings', 'landingPage', 'aboutPage', 'projectsPage', 'servicesPage', 'articlesPage'].includes(listItem.getId())
            ),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
