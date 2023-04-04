const path = require("path");

module.exports = {
    entry: "./src/index.js",
    mode: "production",
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: [
                    {
                        loader: "babel-loader",
                    },
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        "postcss-preset-env",
                                        {
                                            // Options
                                        },
                                    ],
                                ],
                            },
                        },
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: [".js", ".jsx"],
    },
    output: {
        filename: "content.js",
        path: path.resolve(__dirname, "..", "chrome_extension"),
    },
};
