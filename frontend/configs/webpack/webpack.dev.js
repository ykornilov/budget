import merge from 'webpack-merge';

import getCommonConfig from './webpack.common';

import * as modules from './modules';

export default () => {
    return merge(
        getCommonConfig(),
        {
            mode: 'development',
            devtool: '#cheap-module-eval-source-map',
        },
        modules.loadDevCss(),
    );
};
