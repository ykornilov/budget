import { Repository } from 'sequelize-typescript';
import { Transaction } from 'sequelize/types';
import { CategoryAttributes, CategoryCreatingAttributes, CategoryUpdatingAttributes } from '~/@types/category';
import { Category } from '~/models/category';

export class CategoryService {
    constructor(private readonly categoryRepository: Repository<Category>) {}

    getCategory(userId: number, categoryId: CategoryAttributes['id'], transaction?: Transaction): Promise<Category> {
        return this.categoryRepository.findOne({ where: { id: categoryId, userId }, transaction });
    }

    addCategory(args: CategoryCreatingAttributes, transaction?: Transaction): Promise<Category> {
        return this.categoryRepository.create(args, { transaction });
    }

    updateCategory(
        userId: number,
        categoryId: CategoryAttributes['id'],
        args: CategoryUpdatingAttributes,
        transaction?: Transaction,
    ): Promise<Category> {
        return this.categoryRepository.update(args, { where: { id: categoryId, userId }, transaction });
    }

    async deleteCategory(
        userId: number,
        categoryId: CategoryAttributes['id'],
        transaction?: Transaction,
    ): Promise<Category> {
        const category = await this.categoryRepository.findOne({ where: { id: categoryId, userId }, transaction });
        if (category) {
            category.destroy({ transaction });
        }
        return category;
    }
}
