export type AccountAttributes = {
    id: number;
    account: string;
    balance: number;
    userId: number;
};

export type AccountCreatingAttributes = Omit<AccountAttributes, 'id'>;
export type AccountUpdatingAttributes = Partial<AccountCreatingAttributes>;
