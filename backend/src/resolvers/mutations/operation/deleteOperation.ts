import { IContext } from '~/@types/context';
import { Operation } from '~/models/operation';

type Args = {
    operationId: number;
};

export const deleteOperation = async (parent: undefined, args: Args, context: IContext): Promise<Operation | null> => {
    const { userId, services } = context;
    if (!userId) return Promise.resolve(null);

    const { operationId } = args;

    let operation = null;
    const transaction = await services.db.transaction();
    try {
        operation = await services.operationService.deleteOperation(userId, operationId, transaction);
        const account = await services.accountService.getAccount(userId, operation.accountId);
        await services.accountService.updateAccount(
            userId,
            account.id,
            { balance: account.balance - operation.amount },
            transaction,
        );

        transaction.commit();
    } catch (error) {
        console.log(error);
        transaction.rollback();
    }

    return operation;
};
