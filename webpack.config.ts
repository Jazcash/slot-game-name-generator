import * as path from "path";
import * as webpack from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import HtmlWebpackPlugin = require("html-webpack-plugin");

const devMode = process.env.NODE_ENV !== 'production';

const config: webpack.Configuration = {
    mode: devMode ? "development" : "production",
    watch: devMode,
    devtool: devMode ? "source-map" : "nosources-source-map",
    entry: path.join(__dirname, "src/app.ts"),
    output: {
        path: path.join(__dirname, "dist"),
        filename: "[name].js"
    },
    resolve: {
        modules: [
            path.join(__dirname, "src"),
            path.join(__dirname, "node_modules")
        ],
        extensions: [".ts", ".js"]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'ts-loader',
                }],
            },
            {
                test: /\.ejs$/,
                use: [{
                    loader: 'ejs-webpack-loader',
                }],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    devMode ? "style-loader" : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            }
        ],
    },
    devServer: {
        port: 3850,
        writeToDisk: true
    },
    plugins: [
        new CleanWebpackPlugin(),
        devMode ? null : new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "src/index.htm")
        })
    ].filter(Boolean)
}

export default config;