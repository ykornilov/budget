import { Table, Column, Model, DataType, ForeignKey, Default } from 'sequelize-typescript';
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

    @Default(0)
    @Column(DataType.DECIMAL)
    get balance(): number {
        return Number(this.getDataValue('balance'));
    }
    set balance(value: number) {
        this.setDataValue('balance', value);
    }

    @ForeignKey(() => User)
    @Column
    userId!: number;
}
