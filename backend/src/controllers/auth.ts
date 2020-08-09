import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { AnyError } from '~/@types/anyError';
import { User } from '~/models/user';
import { BaseController } from './base';

class AuthController extends BaseController {
    public initRouter(): void {
        this.router.post('/login', this.resolveLogin);
        this.router.post('/logout', this.resolveLogout);
    }

    private resolveLogin(req: Request, res: Response, next: NextFunction): void {
        passport.authenticate('local', { session: false }, (error: AnyError, user: User | undefined): void | Response<
            string
        > => {
            if (error && error === 403) return res.status(403).send('Incorrect password');

            if (error) return next(error);

            if (!user) return res.sendStatus(403);

            req.login(user, { session: false }, (error) => {
                if (error) return next(error);
                if (!process.env.SK) return next(new Error('Не указан secret key'));

                jwt.sign({ id: user.id, email: user.email }, process.env.SK, { expiresIn: '30m' }, (error, token) => {
                    if (error) return next(error);

                    res.cookie('token', token, {
                        secure: true,
                        maxAge: Date.now() + 60 * 60 * 1000,
                        domain: process.env.DOMAIN,
                        httpOnly: true,
                    });
                    return res.redirect('/');
                });
            });
        })(req, res, next);
    }

    private resolveLogout(req: Request, res: Response): void {
        res.clearCookie('token');
        req.logout();
        res.redirect('/');
    }
}

export default AuthController;
