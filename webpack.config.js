const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    mode: 'development',
    devServer:{
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 8080,
        proxy: {
            "/api": {
                target: 'http://127.0.0.1:8081',
                pathRewrite: {'^/api' : ''},
                changeOrigin: true
            }
        },
    },
    plugins:[
        new HtmlWebpackPlugin({template:'./src/index.html'}),
        new VueLoaderPlugin()
    ],
    resolve: {
        extensions: [".ts", ".js", ".vue", ".json"],
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    module: {
        rules: [
            {
                test: /\.(css|sass|scss)$/,
                use: [
                    'style-loader',
                    { 
                        loader: 'css-loader',
                        options: { importLoaders: 1 } 
                    },
                    'sass-loader'
                ]
            },
            {
                test:/\.js$/,
                loader: "babel-loader",
                exclude:/node_modules/
            },
            {
                test:/\.vue$/,
                loader:'vue-loader'
            },
            {
                test:/\.(woff2?|eot|ttf|otf|svg|png|jpg)(\?.*)?$/,
                loader:"url-loader",
                options:{
                    limit:10000,
                    name:'fonts/[name].[ext]?[hash]'
                }
            },
        ]
    }
}