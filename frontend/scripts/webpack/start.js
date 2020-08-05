import webpack from 'webpack';
import chalk from 'chalk';
import devServer from 'webpack-dev-server';

import getConfig from '../../configs/webpack/webpack.dev';

import { HOST, PORT } from './constants';

const compiler = webpack(getConfig());

const server = new devServer(compiler, {
    historyApiFallback: true,
    overlay: true,
    quiet: true,
    clientLogLevel: 'none',
    noInfo: true,
    disableHostCheck: true,
    host: HOST,
});

server.listen(PORT, HOST, () => {
    console.log(`${chalk.greenBright('Server listening on')} ${chalk.blueBright(`http://${HOST}:${PORT}`)}`);
});
