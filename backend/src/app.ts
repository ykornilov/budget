import express, { Application, Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
import logger from 'morgan';
import addRequestId from 'express-request-id';
import cookieParser from 'cookie-parser';
import { graphQLPath } from './constants';
import { IServices } from './@types/services';
import { AnyError } from './@types/anyError';
import { passportInit } from './passport';
import { AuthController, ApiController } from './controllers';

export const createExpressMiddleware = (services: IServices): Application => {
    passportInit(services);

    const app: Application = express();

    // logger
    app.use(addRequestId({ setHeader: false, attributeName: 'requestId' }));
    logger.token('requestId', (req: Request) => req.requestId.split('-')[0]);
    app.use(logger('[:date[iso] #:requestId] Started :method :url for :remote-addr', { immediate: true }));
    app.use(logger('[:date[iso] #:requestId] Completed :status :res[content-length] in :response-time ms'));

    // parsers
    app.use(express.json());
    app.use(cookieParser());

    app.use('/api/auth', new AuthController().router);
    app.use('/api/graphql', new ApiController().router);

    // catch 404 and forward to error handler
    app.use((req: Request, res: Response, next: NextFunction): void => {
        if (req.url === graphQLPath) return next();
        next(createError(404));
    });

    // error handler
    app.use((err: AnyError, req: Request, res: Response, next: NextFunction): void => {
        if (req.url === graphQLPath) return next();

        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        // render the error page
        res.status(err.status || 500);
        res.render('error');
    });

    return app;
};
