import { IContext } from '~/@types/context';
import { User } from '~/models/user';

type Args = {
    email: string;
    password: string;
};

export const addUser = (parent: undefined, args: Args, context: IContext): Promise<User> => {
    const { services } = context;
    return services.userService.addUser(args);
};
