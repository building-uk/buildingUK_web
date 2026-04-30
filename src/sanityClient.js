import { createClient } from '@sanity/client'
import { createImageUrlBuilder } from '@sanity/image-url'

export const client = createClient({
    projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
    dataset: import.meta.env.VITE_SANITY_DATASET,
    useCdn: true, // set to `false` to bypass the edge cache
    apiVersion: import.meta.env.VITE_SANITY_API_VERSION,
    stega: {
        enabled: true,
        studioUrl: '/studio',
    },
})

const builder = createImageUrlBuilder(client)

export const urlFor = (source) => builder.image(source)
