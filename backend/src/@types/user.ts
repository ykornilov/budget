export type UserAttributes = {
    id: number;
    email: string;
    password: string;
};

export type UserCreatingAttributes = Omit<UserAttributes, 'id'>;
export type UserUpdatingAttributes = Partial<UserCreatingAttributes>;
