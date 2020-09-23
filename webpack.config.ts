import * as path from "path";
import * as webpack from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import HtmlWebpackPlugin = require("html-webpack-plugin");

const devMode = process.env.NODE_ENV !== 'production';

console.log("DEV MODE =", devMode);

const clientConfig: webpack.Configuration = {
    name: "client",
    mode: devMode ? "development" : "production",
    watch: devMode,
    devtool: devMode ? "source-map" : "nosources-source-map",
    entry: path.join(__dirname, "src/client/app.ts"),
    output: {
        path: path.join(__dirname, "dist/client"),
        filename: "[name].js"
    },
    resolve: {
        modules: [
            path.join(__dirname, "src/client"),
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
                    options: {
                        configFile: path.join(__dirname, "src/client/tsconfig.json")
                    }
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
    plugins: [
        new CleanWebpackPlugin(),
        devMode ? null : new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "src/client/index.htm")
        })
    ].filter(Boolean)
};

export default clientConfig;