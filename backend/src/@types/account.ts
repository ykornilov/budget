export type AccountAttributes = {
    id: number;
    account: string;
    balance: number;
    userId: number;
};

export type AccountCreatingAttributes = Omit<AccountAttributes, 'id' | 'balance'>;
export type AccountUpdatingAttributes = Partial<Omit<AccountAttributes, 'id'>>;
