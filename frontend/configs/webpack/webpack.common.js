import merge from 'webpack-merge';

import { SOURCE, BUILD } from './constants';

import * as modules from './modules';

export default () => {
    const { NODE_ENV } = process.env;

    const DEV = NODE_ENV === 'development';

    return merge(
        {
            entry: SOURCE,
            output: {
                path: BUILD,
                filename: DEV ? 'js/[name].js' : 'js/[name].[contenthash:5].js',
                chunkFilename: DEV ? 'js/[name].js' : 'js/[name].[contenthash:5].js',
                publicPath: '/',
            },
            resolve: {
                extensions: ['.ts', '.tsx', '.js', '.json', '.css'],
            },
        },
        modules.loadImages(),
        modules.loadSvg(),
        modules.loadFonts(),
        modules.setupHtml(),
        modules.setupEnvVariables(),
        modules.loadTypeScript(),
    );
};
