import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { AnyError } from '~/@types/anyError';
import { BaseController } from './base';

class ApiController extends BaseController {
    public initRouter(): void {
        this.router.use(this.jwtAuthenticate);
        this.router.use(this.resolveUser);
        this.router.all('/', (req, res, next) => {
            next();
        });
    }

    private jwtAuthenticate(req: Request, res: Response, next: NextFunction): void {
        passport.authenticate('jwt', { session: false }, (error: AnyError, isAuth: boolean): void | Response<
            string
        > => {
            if (error) return next(error);

            if (!isAuth) return res.sendStatus(403);

            next();
        })(req, res, next);
    }

    private resolveUser(req: Request, res: Response, next: NextFunction): void | Response<string> {
        const decoded = jwt.decode(req.cookies.token);
        const userId = decoded && typeof decoded === 'object' && decoded.id;

        if (!userId) return res.sendStatus(403);

        req.userId = userId;

        next();
    }
}

export default ApiController;
