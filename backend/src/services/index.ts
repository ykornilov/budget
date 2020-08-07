import { Sequelize } from 'sequelize-typescript';
import { IServices } from '~/@types/services';
import { initDatabase } from '../db';
import { User } from '../models/user';
import { UserService } from './user';

export const configureServices = async (db: Sequelize): Promise<IServices> => {
    await initDatabase(db);

    return {
        userService: new UserService(db.getRepository(User)),
    };
};
