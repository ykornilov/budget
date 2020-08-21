import { IContext } from '~/@types/context';
import { Operation } from '~/models/operation';

export const getAllOperations = (parent: undefined, args: undefined, context: IContext): Promise<Operation[]> => {
    const { userId, services } = context;
    return userId ? services.operationService.getAllOperations(userId) : Promise.resolve([]);
};
