import { IContext } from '~/@types/context';
import { Account } from '~/models/account';

type Args = {
    accountId: number;
};

export const deleteAccount = (parent: undefined, args: Args, context: IContext): Promise<Account | null> => {
    const { userId, services } = context;
    return userId ? services.accountService.deleteAccount(userId, args.accountId) : Promise.resolve(null);
};
