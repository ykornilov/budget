import { Repository } from 'sequelize-typescript';
import { Transaction } from 'sequelize/types';
import { AccountAttributes, AccountCreatingAttributes, AccountUpdatingAttributes } from '~/@types/account';
import { Account } from '~/models/account';

export class AccountService {
    constructor(private readonly accountRepository: Repository<Account>) {}

    getAccount(userId: number, accountId: AccountAttributes['id'], transaction?: Transaction): Promise<Account> {
        return this.accountRepository.findOne({ where: { id: accountId, userId }, transaction });
    }

    addAccount(args: AccountCreatingAttributes, transaction?: Transaction): Promise<Account> {
        return this.accountRepository.create(args, { transaction });
    }

    updateAccount(
        userId: number,
        accountId: AccountAttributes['id'],
        args: AccountUpdatingAttributes,
        transaction?: Transaction,
    ): Promise<Account> {
        return this.accountRepository.update(args, { where: { id: accountId, userId }, transaction });
    }

    async deleteAccount(
        userId: number,
        accountId: AccountAttributes['id'],
        transaction?: Transaction,
    ): Promise<Account> {
        const account = await this.accountRepository.findOne({ where: { id: accountId, userId }, transaction });
        if (account) {
            account.destroy({ transaction });
        }
        return account;
    }
}
