import { IServices } from './services';

export type IContext = {
    userId?: string;
    services: IServices;
};
