import { IContext } from '~/@types/context';
import { Category } from '~/models/category';

type Args = {
    categoryId: number;
};

export const deleteCategory = (parent: undefined, args: Args, context: IContext): Promise<Category | null> => {
    const { userId, services } = context;
    return userId ? services.categoryService.deleteCategory(userId, args.categoryId) : Promise.resolve(null);
};
