import passport from 'passport';
import passportLocal from 'passport-local';
import passportJWT, { JwtFromRequestFunction } from 'passport-jwt';
import { IServices } from './@types/services';

const LocalStrategy = passportLocal.Strategy;
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const cookieExtractor: JwtFromRequestFunction = (req) => req.cookies['token'];

export const passportInit = (services: IServices): void => {
    passport.use(
        new LocalStrategy(
            {
                usernameField: 'email',
                passwordField: 'password',
            },
            async (email, password, done) => {
                try {
                    const user = await services.userService.findUserByEmail(email);
                    if (!user) {
                        const newUser = await services.userService.addUser({ email, password });
                        return done(null, newUser);
                    }
                    if (user.password === password) {
                        return done(null, user);
                    }
                } catch (error) {
                    return done(error);
                }
                done(403);
            },
        ),
    );

    passport.use(
        new JWTStrategy(
            {
                jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
                secretOrKey: process.env.SK,
            },
            (jwtPayload, done) => {
                const expTime = jwtPayload.exp * 1000;
                const currentTime = new Date().getTime();

                if (currentTime < expTime) {
                    return done(null, true);
                }

                done(null, false);
            },
        ),
    );

    passport.initialize();
};
