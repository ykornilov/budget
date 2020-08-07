import { IContext } from '~/@types/context';
import { User } from '~/models/user';

type Args = {
    email: string;
    password: string;
};

export const addUser = (_parent: undefined, args: Args, context: IContext): Promise<User> => {
    return context.services.userService.addUser(args);
};
