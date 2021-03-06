﻿"use strict";

/// <binding ProjectOpened='Watch - Development' /> 
var WebpackNotifierPlugin = require('webpack-notifier');

module.exports = {
    entry: "./src/file.js",
    output: {
        filename: "./dist/bundle.js"
    },
    devServer: {
        contentBase: ".",
        host: "localhost",
        port: 9000
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: "babel-loader"
            }
        ]
    },
    plugins: [
      new WebpackNotifierPlugin()
    ]
};