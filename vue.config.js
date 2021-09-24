const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  transpileDependencies: [
    'vuetify'
  ],

  //
  // outputDir: '../themes/esep/pages',
  // assetsDir: '../../esep/assets',
  // indexPath: '../../esep/pages/home.htm',
  //

  devServer: {
    proxy: "https://esep.web-design.kz/"
  },

  pwa: {
    workboxPluginMode: 'InjectManifest',
    name: 'E-SEP',
    short_name: "E-SEP",
    theme_color: "#1976d2",
    background_color: "#fff",
    display: "standalone",
    workboxOptions: {
      swSrc: "src/service-worker.js",
    }
  }
}
