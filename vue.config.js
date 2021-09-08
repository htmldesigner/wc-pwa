module.exports = {
  transpileDependencies: [
    'vuetify'
  ],

  devServer: {
    proxy: "https://wc-pwa-server.herokuapp.com"
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
