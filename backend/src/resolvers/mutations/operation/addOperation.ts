import { IContext } from '~/@types/context';
import { Operation } from '~/models/operation';

type Args = {
    accountId: number;
    categoryId: number;
    amount: number;
    date: string;
};

export const addOperation = async (parent: undefined, args: Args, context: IContext): Promise<Operation | null> => {
    const { userId, services } = context;
    if (!userId) return Promise.resolve(null);

    const { accountId, categoryId, amount, date } = args;

    let operation = null;
    const transaction = await services.db.transaction();
    try {
        const account = await services.accountService.getAccount(userId, accountId);
        await services.accountService.updateAccount(
            userId,
            accountId,
            { balance: account.balance + amount },
            transaction,
        );

        operation = await services.operationService.addOperation(
            {
                userId,
                accountId,
                categoryId,
                amount,
                date,
            },
            transaction,
        );

        transaction.commit();
    } catch (error) {
        console.log(error);
        transaction.rollback();
    }

    return operation;
};
