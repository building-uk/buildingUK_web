import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'ibnvorrn',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2023-05-03',
})

async function test() {
  const query = `*[_type == "blog"] { title, category }`
  const articles = await client.fetch(query)
  console.log(JSON.stringify(articles, null, 2))
}

test()
