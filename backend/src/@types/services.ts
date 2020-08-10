import { Sequelize } from 'sequelize-typescript';
import { UserService } from '~/services/user';
import { AccountService } from '~/services/account';
import { CategoryService } from '~/services/category';
import { OperationService } from '~/services/operation';

export type IServices = {
    db: Sequelize;
    userService: UserService;
    accountService: AccountService;
    categoryService: CategoryService;
    operationService: OperationService;
};
