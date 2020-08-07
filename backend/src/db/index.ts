import { Sequelize } from 'sequelize-typescript';
import { Dialect } from 'sequelize/types';
import models from '../models';

const { DB_DIALECT, DB_HOST, DB_PORT, DB_DATABASE, DB_USERNAME, DB_PASSWORD } = process.env;

const db: Sequelize = new Sequelize({
    dialect: DB_DIALECT as Dialect,
    host: DB_HOST,
    port: Number(DB_PORT),
    database: DB_DATABASE,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    repositoryMode: true,
});

export default db;

export const initDatabase = async (db: Sequelize): Promise<void> => {
    db.addModels(models);
    try {
        await db.authenticate();
        console.log('Connection to database has been established successfully');
    } catch (error) {
        console.error('Unable to connect to the database: ', error);
    }
};
