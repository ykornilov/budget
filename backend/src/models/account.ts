import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
import { AccountAttributes } from '~/@types/account';
import { User } from './user';

@Table({
    tableName: 'Accounts',
})
export class Account extends Model<AccountAttributes> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        field: 'id',
    })
    id!: number;

    @Column
    account!: string;

    @Column(DataType.DECIMAL)
    balance!: number;

    @ForeignKey(() => User)
    @Column
    userId!: number;
}
