/**
 * optimizeImage
 * 
 * Automatically appends Sanity CDN optimization parameters 
 * to raw Sanity image URLs to dramatically reduce payload size.
 * 
 * @param {string} url - The raw image URL
 * @returns {string} The optimized image URL
 */
export const optimizeImage = (url) => {
  if (url && typeof url === 'string' && url.includes('cdn.sanity.io/images') && !url.includes('?')) {
    return `${url}?auto=format&fit=max&q=80&w=1600`
  }
  return url
}
