import { cmsService } from './src/services/cmsService.js'

async function test() {
  const fullData = await cmsService.getArticlesFullPage()
  console.log(JSON.stringify(fullData.articles, null, 2))
}
test()
