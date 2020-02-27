const webpack = require('webpack');
const NODE_ENV = process.env.NODE_ENV
var baseUrl = '';
module.exports = {
  publicPath: baseUrl,
  runtimeCompiler: true,
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      title: 'Dashboard Page',
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    }
  },
  configureWebpack: {
    output: NODE_ENV == 'production' ? {
      filename: 'js/[name].[hash:10].js',
      chunkFilename: 'js/[name].[chunkhash:10].js'
    } : {},
    optimization: NODE_ENV == 'production' ? {
      splitChunks: {
        minSize: 10000,
        maxSize: 250000
      }
    } : {},
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