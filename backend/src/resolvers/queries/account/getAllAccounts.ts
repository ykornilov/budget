import { IContext } from '~/@types/context';
import { Account } from '~/models/account';

export const getAllAccounts = (parent: undefined, args: undefined, context: IContext): Promise<Account[]> => {
    const { userId, services } = context;
    return userId ? services.accountService.getAllAccounts(userId) : Promise.resolve([]);
};
