import { IContext } from '~/@types/context';
import { Account } from '~/models/account';

type Args = {
    account: string;
};

export const addAccount = (parent: undefined, args: Args, context: IContext): Promise<Account | null> => {
    const { userId, services } = context;
    return userId ? services.accountService.addAccount({ userId, ...args }) : Promise.resolve(null);
};
