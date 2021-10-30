const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
    schema { 
        query: Query
    }

    type Query {
        greeting: String
    }
`;

const resolvers = {
    Query: {
        greeting: () => 'Hello World!' //function resolves value of gretings field, can be from db
    }
}

const server = new ApolloServer({typeDefs, resolvers});
server.listen({port: 9000})
    .then((serverInfo) => console.log(`server running at ${serverInfo.url}`));

// playground `query` matches `Query` in schema
// line(4) schema is the invisible entry point or the root element