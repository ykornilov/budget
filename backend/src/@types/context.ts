import { IServices } from './services';

export type IContext = {
    userId?: number;
    services: IServices;
};
