import env from 'postcss-preset-env';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import cssnano from 'cssnano';

const loadCss = ({ sourceMap = false } = { sourceMap: false }) => ({
    loader: 'css-loader',
    options: {
        sourceMap,
        importLoaders: 1,
    },
});

const loadCssModules = ({ sourceMap = false } = { sourceMap: false }) => ({
    loader: 'css-loader',
    options: {
        sourceMap,
        modules: {
            localIdentName: '[path][name]__[local]--[hash:base64:5]',
        },
        importLoaders: 1,
    },
});

const loadPostCss = ({ sourceMap = false, minimize = false } = { sourceMap: false, minimize: false }) => {
    const plugins = [
        env({
            stage: 3,
        }),
    ];

    if (minimize) {
        plugins.push(cssnano({ preset: ['default', { normalizeUrl: false }] }));
    }

    return {
        loader: 'postcss-loader',
        options: {
            plugins,
            sourceMap,
        },
    };
};

export const loadDevCss = () => ({
    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: /\.m\.css$/,
                use: ['style-loader', loadCss({ sourceMap: true }), loadPostCss({ sourceMap: true, minimize: false })],
            },
            {
                test: /\.m\.css$/,
                use: [
                    'style-loader',
                    loadCssModules({ sourceMap: true }),
                    loadPostCss({ sourceMap: true, minimize: false }),
                ],
            },
        ],
    },
});

export const loadProdCss = () => ({
    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: /\.m\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    loadCss({ sourceMap: false }),
                    loadPostCss({ sourceMap: false, minimize: true }),
                ],
            },
            {
                test: /\.m\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    loadCssModules({ sourceMap: false }),
                    loadPostCss({ sourceMap: false, minimize: true }),
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:5].css',
            chunkFilename: 'css/[name].[contenthash:5].[id].css',
        }),
    ],
});
