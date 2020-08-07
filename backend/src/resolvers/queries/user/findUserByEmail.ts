import { IContext } from '~/@types/context';
import { User } from '~/models/user';

type Args = {
    email: string;
};

export const findUserByEmail = (_parent: undefined, { email }: Args, context: IContext): Promise<User> => {
    return context.services.userService.findUserByEmail(email);
};
