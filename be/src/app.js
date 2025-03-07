const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const postSchema = require('../src/schemas/postSchema.js');
const resolvers = require('../src/resolvers/postResolvers.js');
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