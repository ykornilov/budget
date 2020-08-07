import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { UserAttributes } from '~/@types/user';

@Table({
    tableName: 'Users',
})
export class User extends Model<UserAttributes> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        field: 'id',
    })
    id!: number;

    @Column({
        unique: true,
    })
    email!: string;

    @Column
    password!: string;
}
