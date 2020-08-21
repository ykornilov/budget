import { gql } from 'apollo-server-express';

const typeDef = gql`
    type Query {
        findUserByEmail(email: String!): User
        getAllAccounts: [Account!]!
        getAllCategories: [Category!]!
        getAllOperations: [Operation!]!
    }

    type Mutation {
        addUser(email: String!, password: String!): User

        addAccount(account: String!): Account
        deleteAccount(accountId: Int!): Account

        addCategory(category: String!): Category
        deleteCategory(categoryId: Int!): Category

        addOperation(accountId: Int!, categoryId: Int!, amount: Float!, date: String!): Operation
        deleteOperation(operationId: Int!): Operation
    }

    type User {
        id: Int!
        email: String!
        password: String
    }

    type Account {
        id: Int!
        account: String!
        balance: Float!
        userId: Int!
    }

    type Category {
        id: Int!
        category: String!
        userId: Int!
    }

    type Operation {
        id: Int!
        amount: Float!
        date: String!
        userId: Int!
        accountId: Int!
        categoryId: Int!
    }
`;

export default typeDef;
