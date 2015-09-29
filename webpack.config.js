module.exports = {

  entry: "./src/entry.js",

  output: {
    path: __dirname,
    filename: "bundle.js"
  },

  module: {
    loaders: [
      { test: /pixi.js/, loader: "script" },
      { test: /phaser.js/, loader: "script" },
      { test: /main.js/, loader: "babel" },
      {
        test: /\.js$/,
        loader: ['babel'],
        exclude: [/node_modules/, /lib/],
        query: {
          optional: ['runtime'],
          stage: 0
        }
      }
    ]
  }

};
