export type CategoryAttributes = {
    id: number;
    category: string;
    userId: number;
};

export type CategoryCreatingAttributes = Omit<CategoryAttributes, 'id'>;
export type CategoryUpdatingAttributes = Partial<CategoryCreatingAttributes>;
