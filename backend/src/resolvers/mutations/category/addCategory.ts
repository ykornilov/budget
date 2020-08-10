import { IContext } from '~/@types/context';
import { Category } from '~/models/category';

type Args = {
    category: string;
};

export const addCategory = (parent: undefined, args: Args, context: IContext): Promise<Category | null> => {
    const { userId, services } = context;
    return userId ? services.categoryService.addCategory({ userId, ...args }) : Promise.resolve(null);
};
