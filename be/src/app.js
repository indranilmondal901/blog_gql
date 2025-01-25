const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const postSchema = require('./schemas/postSchema');
const resolvers = require('./resolvers/postResolvers');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

app.use(
    '/graphql',
    graphqlHTTP({
        schema: postSchema,
        rootValue: resolvers,
        graphiql: true, // testing
    })
);

module.exports = app;