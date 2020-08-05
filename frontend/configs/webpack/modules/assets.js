import { DefinePlugin } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export const setupHtml = () => ({
    plugins: [
        new HtmlWebpackPlugin({
            template: './static/template.html',
            title: 'Бюджет',
            favicon: './static/budget_icon.png',
        }),
    ],
});

export const setupEnvVariables = () => ({
    plugins: [
        new DefinePlugin({
            BUDGET_API_URL: JSON.stringify(process.env.BUDGET_API_URL),
        }),
    ],
});

export const loadImages = () => ({
    module: {
        rules: [
            {
                test: /\.(png|jpg|jpeg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: './assets/images/[name].[ext]',
                        },
                    },
                ],
            },
        ],
    },
});

export const loadSvg = () => ({
    module: {
        rules: [
            {
                test: /\.svg$/,
                issuer: {
                    test: /\.(js|ts)x?$/,
                },
                use: [
                    '@svgr/webpack',
                    {
                        loader: 'file-loader',
                        options: {
                            name: './assets/images/[name].[ext]',
                        },
                    },
                ],
            },
            {
                test: /\.svg$/,
                issuer: {
                    test: /\.css$/,
                },
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: './assets/images/[name].[ext]',
                        },
                    },
                ],
            },
        ],
    },
});

export const loadFonts = () => ({
    module: {
        rules: [
            {
                test: /\.woff2$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: './assets/fonts/[name].[ext]',
                        },
                    },
                ],
            },
        ],
    },
});
