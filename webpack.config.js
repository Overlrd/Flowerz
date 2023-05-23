const  path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');

var config = {
    resolve: {
        extensions: ['.tsx', '.ts', '.js','jsx'],
      },
    module: {
        rules: [
            {
                test: /\.css/i,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.png/,
                type: 'asset/resource'
            },
            {
                test: /\.(?:js|jsx|cjs)$/,
                exclude: /node_modules/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: [
                      ['@babel/preset-react', { targets: "defaults" }]
                    ]
                  }
                }
              },
        ],
    },
    optimization: {
        minimize: false
    }
}

var coreConfig = Object.assign({}, config, {
    name: "core",
    entry: {
        index: './src/index.js',
    },
    output: {
        'path': path.resolve(__dirname,'static' ),
        'filename': '[name].[contenthash].js',
        clean: true

    },
    plugins: [new HtmlWebpackPlugin({
        template: './templates/base_webpack.html',
        filename: '../templates/base.html'
    })],
})

module.exports = [
    coreConfig
]
