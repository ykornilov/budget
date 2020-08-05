import merge from 'webpack-merge';

import getCommonConfig from './webpack.common';

import * as modules from './modules';

export default () => {
    const { ANALYZE } = process.env;

    return merge(
        getCommonConfig(),
        {
            mode: 'production',
            devtool: false,
        },
        modules.cleanBuildDirectory(),
        modules.loadProdCss(),
        ANALYZE ? modules.setupBuildAnalysis() : {},
    );
};
