const { createClient } = require('@sanity/client');
const fs = require('fs');
const path = require('path');

const client = createClient({
  projectId: 'ibnvorrn',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2025-08-15',
  // Using token if provided, but we'll try to use the CLI's environment
  token: process.env.SANITY_TOKEN 
});

async function uploadImage(filePath) {
  try {
    const asset = await client.assets.upload('image', fs.createReadStream(filePath), {
      filename: path.basename(filePath)
    });
    console.log(`Uploaded ${path.basename(filePath)}: ${asset._id}`);
    return asset._id;
  } catch (err) {
    console.error(`Failed to upload ${path.basename(filePath)}:`, err.message);
    return null;
  }
}

async function run() {
  const imageDir = path.join(__dirname, '../public/images');
  const imagesToUpload = [
    'logo.png',
    'contact-map-full.jpg',
    'contact-side.jpg',
    'hero-bg.jpg',
    'page-hero-bg.jpg',
    'testimonials-bg.jpg',
    'logo-white.png'
  ];

  const uploaded = {};
  for (const name of imagesToUpload) {
    const fullPath = path.join(imageDir, name);
    if (fs.existsSync(fullPath)) {
      uploaded[name] = await uploadImage(fullPath);
    }
  }

  // Update siteSettings
  if (uploaded['logo.png']) {
    await client.patch('siteSettings').set({
      logo: { _type: 'image', asset: { _ref: uploaded['logo.png'], _type: 'reference' } },
      contactMapImage: uploaded['contact-map-full.jpg'] ? { _type: 'image', asset: { _ref: uploaded['contact-map-full.jpg'], _type: 'reference' } } : undefined,
      contactSideImage: uploaded['contact-side.jpg'] ? { _type: 'image', asset: { _ref: uploaded['contact-side.jpg'], _type: 'reference' } } : undefined,
      defaultPageHeroImage: uploaded['page-hero-bg.jpg'] ? { _type: 'image', asset: { _ref: uploaded['page-hero-bg.jpg'], _type: 'reference' } } : undefined,
      testimonialsBackgroundImage: uploaded['testimonials-bg.jpg'] ? { _type: 'image', asset: { _ref: uploaded['testimonials-bg.jpg'], _type: 'reference' } } : undefined,
    }).commit();
    console.log('Updated siteSettings');
  }

  // Update landingPage hero
  if (uploaded['hero-bg.jpg']) {
    await client.patch('landingPage').set({
      'hero.slideshowImages': [
        { _key: 'h1', _type: 'image', asset: { _ref: uploaded['hero-bg.jpg'], _type: 'reference' } }
      ]
    }).commit();
    console.log('Updated landingPage');
  }
}

run();
