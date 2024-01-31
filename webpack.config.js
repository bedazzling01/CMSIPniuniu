/**
 * @author: qi.zhao
 */

/**
 * Look in ./config folder for webpack.dev.js
 */
switch (process.env.NODE_ENV) {
  case 'prod':
  case 'production':
    module.exports = require('./config/webpack.prod')({mode: 'production'});
    break;
  case 'dev':
  case 'development':
  default:
    module.exports = require('./config/webpack.dev')({mode:'development'});
}
