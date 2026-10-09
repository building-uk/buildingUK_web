import { getCliClient } from 'sanity/cli'

const client = getCliClient({ apiVersion: '2024-03-01' })

async function migrate() {
  const doc = await client.fetch(`*[_type == "aboutPage"][0]`)
  if (!doc) {
    console.log('No aboutPage document found.')
    return
  }

  const patch = client.patch(doc._id)
  let updated = false

  // Helper to convert plain string or paragraph string to block array
  const textToBlocks = (val) => {
    if (typeof val === 'string') {
      const paragraphs = val.split('\n\n').filter(Boolean)
      return paragraphs.map((para) => ({
        _type: 'block',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _type: 'span',
            marks: [],
            text: para.trim(),
          },
        ],
      }))
    }
    return val
  }

  if (typeof doc.introSection?.text === 'string') {
    patch.set({ 'introSection.text': textToBlocks(doc.introSection.text) })
    updated = true
  }

  if (typeof doc.reliabilitySection?.text === 'string') {
    patch.set({ 'reliabilitySection.text': textToBlocks(doc.reliabilitySection.text) })
    updated = true
  }

  if (typeof doc.mdSection?.mdBio === 'string') {
    patch.set({ 'mdSection.mdBio': textToBlocks(doc.mdSection.mdBio) })
    updated = true
  }

  if (updated) {
    console.log('Migrating text fields from plain strings to Rich Text block arrays...')
    await patch.commit()
    console.log('Migration complete successfully!')
  } else {
    console.log('No plain string text fields needed conversion.')
  }
}

migrate().catch((err) => {
  console.error('Migration failed:', err)
  process.exit(1)
})
