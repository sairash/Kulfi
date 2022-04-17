const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  pwa: {
    themeColor: '#18181B',
    msTileColor: '#000000',
    iconPaths: {
      msTileImage: 'img/icons/mstile-150x150.png'
    }
  }
})
