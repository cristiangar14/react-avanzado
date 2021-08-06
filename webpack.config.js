const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackPwaManifestPlugin = require('webpack-pwa-manifest')
const WorkboxWebpackPlugin = require('workbox-webpack-plugin')
const path = require('path')
module.exports = {
  output: {
    filename: 'app.bundle.js',
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new WebpackPwaManifestPlugin({
      orientation: 'portrait',
      display: 'standalone',
      name: 'Pettgram - Tu app de fotos de mascotas',
      start_url: '/',
      scope: '/',
      shortname: 'Pettgram',
      description: 'Con Petgram puedes encontrar fotos de animales domésticos',
      background_color: '#fff',
      theme_color: '#b1a',
      crossorigin: 'use-credentials',
      icons: [
        {
          src: path.resolve(__dirname, 'src/assets/icon.png'),
          sizes: [96, 128, 192, 256, 384, 512, 450]
        },
        {
          src: path.resolve('src/assets/icon.png'),
          size: '1024x1024'
        },
        {
          src: path.resolve('src/assets/icon.png'),
          size: '1024x1024',
          purpose: 'maskable'
        }
      ]
    }),
    new WorkboxWebpackPlugin.GenerateSW({
      runtimeCaching: [
        {
          urlPattern: new RegExp('https://(res.cloudinary.com|images.unplash.com)'),
          handler: 'CacheFirst',
          options: {
            cacheName: 'images'
          }
        },
        {
          urlPattern: new RegExp('https://petgram-server-cristian-eight.vercel.app'),
          handler: 'NetworkFirst',
          options: {
            cacheName: 'api'
          }
        }
      ]
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['@babel/plugin-syntax-dynamic-import']
          }
        }
      }
    ]
  }
}
