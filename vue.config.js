module.exports = {
  transpileDependencies: [
    'vuetify'
  ],

  devServer: {
    proxy: "http://esep.web-design.kz/"
  },

  pwa: {
    workboxPluginMode: 'InjectManifest',
    name: 'CheckWater',
    themeColor: '#4B31B3',
    workboxOptions: {
      swSrc: "src/service-worker.js",

    }
  }
}
