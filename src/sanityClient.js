import { createClient } from '@sanity/client'
import { createImageUrlBuilder } from '@sanity/image-url'

// Stega encoding is ONLY enabled in preview/draft mode.
// In production it injects invisible Unicode characters into every string
// field returned by Sanity, which is why title lengths can balloon to 987+
// characters and headings look corrupted.
const isPreview = import.meta.env.VITE_SANITY_PREVIEW === 'true'

export const client = createClient({
    projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
    dataset: import.meta.env.VITE_SANITY_DATASET,
    useCdn: !isPreview, // bypass CDN cache in preview so drafts are fresh
    apiVersion: import.meta.env.VITE_SANITY_API_VERSION,
    stega: {
        enabled: isPreview,
        studioUrl: '/studio',
    },
})

const builder = createImageUrlBuilder(client)

export const urlFor = (source) => builder.image(source)
