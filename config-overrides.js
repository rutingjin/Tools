const webpack = require('webpack')

module.exports = function override(config, env) {
    config.target = 'electron-renderer'
    return config;
}