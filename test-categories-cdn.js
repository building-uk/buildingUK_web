import { createClient } from '@sanity/client'
import fs from 'fs'

const client = createClient({
  projectId: 'ibnvorrn',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2023-05-03',
})

async function test() {
  const query = `*[_type == "blog"] | order(publishedAt desc) {
      "id": slug.current,
      title,
      category,
      "date": publishedAt,
      author,
      "image": mainImage.asset->url,
      "excerpt": blurb,
      "content": body
    }`
  const articles = await client.fetch(query)
  console.log(JSON.stringify(articles, null, 2))
}

test()
