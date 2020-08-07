export type OperationAttributes = {
    id: number;
    amount: number;
    date: string;
    userId: number;
    categoryId: number;
    accountId: number;
};

export type OperationCreatingAttributes = Omit<OperationAttributes, 'id'>;
export type OperationUpdatingAttributes = Partial<OperationCreatingAttributes>;
