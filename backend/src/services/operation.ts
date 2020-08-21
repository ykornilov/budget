import { Repository } from 'sequelize-typescript';
import { Transaction } from 'sequelize/types';
import { OperationAttributes, OperationCreatingAttributes, OperationUpdatingAttributes } from '~/@types/operation';
import { Operation } from '~/models/operation';

export class OperationService {
    constructor(private readonly operationRepository: Repository<Operation>) {}

    getAllOperations(userId: number, transaction?: Transaction): Promise<Operation[]> {
        return this.operationRepository.findAll({ where: { userId }, transaction });
    }

    addOperation(args: OperationCreatingAttributes, transaction?: Transaction): Promise<Operation> {
        return this.operationRepository.create(args, { transaction });
    }

    updateOperation(
        userId: number,
        operationId: OperationAttributes['id'],
        args: OperationUpdatingAttributes,
        transaction?: Transaction,
    ): Promise<Operation> {
        return this.operationRepository.update(args, { where: { id: operationId, userId }, transaction });
    }

    async deleteOperation(
        userId: number,
        operationId: OperationAttributes['id'],
        transaction?: Transaction,
    ): Promise<Operation> {
        const operation = await this.operationRepository.findOne({ where: { id: operationId, userId }, transaction });
        if (operation) {
            operation.destroy({ transaction });
        }
        return operation;
    }
}
