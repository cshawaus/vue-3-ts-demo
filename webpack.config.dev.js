const { HotModuleReplacementPlugin } = require('webpack')
const webpackMerge = require('webpack-merge')

const configuration = require('./config/webpack.config.base')

module.exports = webpackMerge(
  configuration({
    development: true,
  }),
  {
    plugins: [
      new HotModuleReplacementPlugin(),
    ],
  },
)