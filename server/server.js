const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
    type Query {
        greeting: String
    }
`;

const resolvers = {
    Query: {
        greeting: () => 'Hello World!' //function resolves value of gretings field, can be from db
    }
}

// resolvers need to mirror typedefinition precicely
// Query(line 4) => Query(line 10)

const server = new ApolloServer({typeDefs, resolvers});
server.listen({port: 9000})
    .then((serverInfo) => console.log(`server running at ${serverInfo.url}`));


// run by opening terminal, `node server.js`