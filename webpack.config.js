var webpack = require('webpack')
module.exports = {
    entry: {
        bundle1: './src/main1',
        bundle2: './src/main2',
        bundle3: './src/main3'
    },
    output: {
        filename: './src/[name].js'
    },
    module: {
         loaders: [
           {
             test: /\.css$/,
             use: ['style-loader', 'css-loader','autoprefixer-loader']
           },
           {
             test: /\.js$/,
             exclude: /(node_modules|bower_components)/,
             use: [
               'babel-loader','eslint-loader'
             ]
           }
     ]
   },
   plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    })
  ]
}