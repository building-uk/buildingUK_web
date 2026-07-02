import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'ibnvorrn',
    dataset: 'production',
  },
  vite: (config) => {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve?.alias,
          'inherits': 'inherits/inherits_browser.js',
        },
      },
    }
  }
})
