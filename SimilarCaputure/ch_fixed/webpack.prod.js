const webpack = require("webpack");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const baseConfig = require("./webpack.base.js");
module.exports = function (env, args) {
    const prodConfig = baseConfig(env, args);
    prodConfig.plugins.splice(0, 0, new CleanWebpackPlugin(['dist']));
    prodConfig.mode = "production";
    return prodConfig;
}