const webpack = require('webpack');
var baseUrl = '';
module.exports = {
  publicPath: baseUrl,
  runtimeCompiler: true,
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery/dist/jquery.min',
        jQuery: 'jquery/dist/jquery.min',
        'window.jQuery': 'jquery/dist/jquery.min',
      }),
    ],
  },

  devServer: {
    proxy: 'https://www.xiaoxiongmeishu.com'
  }
}