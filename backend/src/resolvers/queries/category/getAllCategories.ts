import { IContext } from '~/@types/context';
import { Category } from '~/models/category';

export const getAllCategories = (parent: undefined, args: undefined, context: IContext): Promise<Category[]> => {
    const { userId, services } = context;
    return userId ? services.categoryService.getAllCategories(userId) : Promise.resolve([]);
};
