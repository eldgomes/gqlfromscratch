const { gql } = require('apollo-server'); //tag function

// simplest graphql schema (1 query taht return string)
const typeDefs = gql`
    type Query {
        greeting: String
    }
`;

// line 2 -> graphql schema definition
// type -> like class, has felds

console.log(typeDefs);