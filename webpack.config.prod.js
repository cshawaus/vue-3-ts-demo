const configuration = require('./config/webpack.config.base')

module.exports = configuration({
  production: true,
})