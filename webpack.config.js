'use strict'

const {resolve} = require('path')

module.exports = {
    entry: './app/main.js',
    mode: 'development',
    output: {
      path: __dirname,
      filename: './public/bundle.js'
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.js', '.jsx']
      },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                include: resolve(__dirname, './app'),
                // exclude: /node_modules/,
                loader: 'babel-loader',
                // use: {
                //   loader: 'babel-loader',
                //   options: {
                //     presets: ['env']
                //   }
                // }
            },
            {
              test: /\.css$/,
              use: [
                'style-loader',
                'css-loader'
              ]
            }
        ]
    }
  }
