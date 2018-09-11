const path = require("path");
const webpack = require("webpack");
const baseConfig = require("./webpack.base.js");
module.exports = function (env, args) {
    const devConfig = baseConfig(env, args);
    devConfig.devServer = {
        host: '10.16.113.27',
        contentBase: path.join(__dirname, './dist'), // boolean | string | array, static file location
        compress: true, // enable gzip compression
        historyApiFallback: true, // true for index.html upon 404, object for multiple paths
        hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
        https: false, // true for self-signed, object for cert authority
        noInfo: true, // only errors & warns on hot reload
        port: 3003,
        overlay: true,
        inline: true
        // open: true

    };
    devConfig.watchOptions = {
        poll: 1000,
        ignored: /node_modules/,
    };
    devConfig.plugins.push(...[
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ]);
    devConfig.mode = "development";
    return devConfig;
}