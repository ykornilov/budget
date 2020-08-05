import webpack from 'webpack';
import chalk from 'chalk';

import getConfig from '../../configs/webpack/webpack.prod';

const compiler = webpack(getConfig());

compiler.run((error, stats) => {
    if (error) {
        console.error(error.stack || error);

        if (error.details) {
            console.error(error.details);
        }

        return;
    }

    const info = stats.toString({
        colors: true,
        hash: true,
        version: true,
        timings: true,
        env: true,
        chunks: false,
        modules: false,
        children: false,
        publicPath: true,
        reasons: true,
        source: false,
    });

    console.log(chalk.greenBright('Build completed.'));
    console.log(info);

    if (stats.hasErrors()) {
        console.log(chalk.redBright('Error!'));
        console.error(info);
    }

    if (stats.hasWarnings()) {
        console.log(chalk.yellowBright('Warning!'));
        console.warn(info);
    }
});
