import { gql } from 'apollo-server-express';

const typeDef = gql`
    type Query {
        findUserByEmail(email: String!): User
    }

    type Mutation {
        addUser(email: String!, password: String!): User!
    }

    type User {
        id: Int!
        email: String!
        password: String
    }
`;

export default typeDef;
