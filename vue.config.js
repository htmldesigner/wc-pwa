module.exports = {
  transpileDependencies: [
    'vuetify'
  ],

  pwa: {
    workboxPluginMode: 'InjectManifest',
    name: 'CheckWater',
    themeColor: '#4B31B3',
    workboxOptions: {
      swSrc: "src/service-worker.js",

    }
  }
}
