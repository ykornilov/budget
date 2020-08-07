import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
import { OperationAttributes } from '~/@types/operation';
import { User } from './user';
import { Category } from './category';
import { Account } from './account';

@Table({
    tableName: 'Operations',
})
export class Operation extends Model<OperationAttributes> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        field: 'id',
    })
    id!: number;

    @Column(DataType.DECIMAL)
    amount!: number;

    @Column(DataType.DATE)
    date!: string;

    @ForeignKey(() => User)
    @Column
    userId!: number;

    @ForeignKey(() => Category)
    @Column
    categoryId!: number;

    @ForeignKey(() => Account)
    @Column
    accountId!: number;
}
