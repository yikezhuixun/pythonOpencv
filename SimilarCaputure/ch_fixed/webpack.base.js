const path = require("path");
const webpack = require("webpack");
const htmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = function (env, args) {
    const dpi = env ? env : 1920;
    return {
        entry: {
            app: './app/js/index.js',
            ["style." + dpi]: "./app/style/" + dpi + "/style.less",
            //["style"]: "./app/style/adpative/style.less",
            //"style.1366": "./app/style/1366/style.less",
        },
        output: {
            path: path.resolve(__dirname, "./dist"),
            filename: "js/[name].bundle.js",
            publicPath: "",
        },
        target: "web",
        module: {

            rules: [

                {
                    test: /\.js?$/,
                    include: [
                        path.resolve(__dirname, "app")
                    ],
                    loader: "babel-loader",
                    options: {
                        presets:[["env", {
                            "targets": {
                                "chrome": 34
                            },
                            modules: false,
                            loose: true
                        }]]
                    }

                },

                {
                    test: /\.(less|css)$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 2,
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: () => [
                                    require('autoprefixer')
                                ],

                                sourceMap: true
                            }
                        }, {
                            loader: 'less-loader',

                        }
                    ]
                },
                {

                    test: /\.(png|gif|jpg|svg|jpeg|ttf)$/i,
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        name: 'asset/[name].[ext]',
                        publicPath: '../'
                    }

                }

            ],

        },
        plugins: [
            new CopyWebpackPlugin([{
                    from: __dirname + '/app/lib/webui-min.js',
                    to: __dirname + "/dist/js",
                }, {
                    from: __dirname + "/app/resource/app/",
                    to: __dirname + "/dist/asset/icon/app/",
                }, {
                    from: __dirname + "/app/resource/source/",
                    to: __dirname + "/dist/asset/icon/input/",
                }, {
                    from: __dirname + "/app/resource/usb/",
                    to: __dirname + "/dist/asset/icon/usb/",
                }, {
                    from: __dirname + "/app/resource/sound/",
                    to: __dirname + "/dist/asset/sound/",
                }, {
                    from: __dirname + "/app/resource/network/",
                    to: __dirname + "/dist/asset/icon/network/",
                }, {
                    from: __dirname + "/app/data/",
                    to: __dirname + "/dist/data",
                }, {
                    from: __dirname + "/app/resource/hdv.jpg",
                    to: __dirname + "/dist/asset/hdv.jpg",
                }

            ]),
           
            new MiniCssExtractPlugin({
                filename: "css/[name].css",
                chunkFilename: "[name].less"
            }),
            new htmlWebpackPlugin({
                filename: 'index.html',
                template: './app/template/index.tmp.html',
                inject: 'head',
                minify: {
                    removeComments: true,
                    collapseWhitespace: true
                }

            }),
        ],
    }
};