import { Repository } from 'sequelize-typescript';
import { UserCreatingAttributes } from '~/@types/user';
import { User } from '~/models/user';

export class UserService {
    constructor(private readonly userRepository: Repository<User>) {}

    findUserByEmail(email: string): Promise<User> {
        return this.userRepository.findOne({ where: { email } });
    }

    addUser(args: UserCreatingAttributes): Promise<User> {
        return this.userRepository.create(args);
    }
}
