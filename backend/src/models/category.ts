import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
import { CategoryAttributes } from '~/@types/category';
import { User } from './user';

@Table({
    tableName: 'Categories',
})
export class Category extends Model<CategoryAttributes> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        field: 'id',
    })
    id!: number;

    @Column
    category!: string;

    @ForeignKey(() => User)
    @Column
    userId!: number;
}
