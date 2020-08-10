import { Sequelize } from 'sequelize-typescript';
import { IServices } from '~/@types/services';
import { initDatabase } from '../db';
import { User } from '../models/user';
import { UserService } from './user';
import { Account } from '../models/account';
import { AccountService } from './account';
import { Category } from '../models/category';
import { CategoryService } from './category';
import { Operation } from '../models/operation';
import { OperationService } from './operation';

export const configureServices = async (db: Sequelize): Promise<IServices> => {
    await initDatabase(db);

    return {
        db,
        userService: new UserService(db.getRepository(User)),
        accountService: new AccountService(db.getRepository(Account)),
        categoryService: new CategoryService(db.getRepository(Category)),
        operationService: new OperationService(db.getRepository(Operation)),
    };
};
