const path = require('path'),
    webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        app: ['./src/Index.tsx'],
        vendor: ['react', 'react-dom'],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].bundle.js',
        chunkFilename: 'js/[name].bundle.js',
        publicPath: '/'
    },
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    enforce: true,
                    chunks: 'all'
                }
            }
        }
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.ts', '.tsx', '.css']
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                loader: 'ts-loader'
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            }
        ],

    },
    plugins: [
        new HtmlWebpackPlugin({ 
            template: path.resolve(__dirname, 'src', 'index.html'),
            favicon: "./src/favicon.ico" }),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        port: 3000,
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        historyApiFallback: true
    }
}