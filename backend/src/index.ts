import http from 'http';
import debugService from 'debug';
import { createExpressMiddleware } from './app';
import { createApolloServer } from './apollo';
import { graphQLPath } from './constants';
import { configureServices } from './services';
import db from './db';

configureServices(db).then((services) => {
    const app = createExpressMiddleware(services);
    const debug = debugService('express-example:server');
    const port = normalizePort(process.env.PORT || '3000');
    app.set('port', port);

    const apolloServer = createApolloServer(services);
    apolloServer.applyMiddleware({ app, path: graphQLPath });

    const server = http.createServer(app);

    /**
     * Listen on provided port, on all network interfaces.
     */
    server.listen(port);
    server.on('error', onError);
    server.on('listening', onListening);

    /**
     * Event listener for HTTP server "error" event.
     */

    function onError(error: NodeJS.ErrnoException) {
        if (error.syscall !== 'listen') {
            throw error;
        }

        const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

        // handle specific listen errors with friendly messages
        switch (error.code) {
            case 'EACCES':
                console.error(bind + ' requires elevated privileges');
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(bind + ' is already in use');
                process.exit(1);
                break;
            default:
                throw error;
        }
    }

    /**
     * Event listener for HTTP server "listening" event.
     */

    function onListening() {
        const addr = server.address();
        if (addr) {
            const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
            debug('Listening on ' + bind);
        }
    }
});

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val: string) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}
