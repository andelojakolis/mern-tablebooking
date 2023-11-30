import dotenv from "dotenv";
dotenv.config();
import 'reflect-metadata'
import express from 'express'
import { buildSchema } from "type-graphql";
import cookieParser = require("cookie-parser")
import { ApolloServer } from "apollo-server-express";
import {
    ApolloServerPluginLandingPageGraphQLPlayground,
    ApolloServerPluginLandingPageProductionDefault,
  } from "apollo-server-core";
import { resolvers } from "./resolvers"

async function bootstrap(){
    // Build the schema
    const schema = await buildSchema({
        resolvers,
        // authChecker
    })
    // Init express
    const app = express();
    app.use(cookieParser())
    // Create the apollo server
    const server = new ApolloServer({
        schema,
        context: (ctx) => {
            return ctx
        },
        plugins: [
            process.env.NODE_ENV === 'production' ? ApolloServerPluginLandingPageProductionDefault() : ApolloServerPluginLandingPageGraphQLPlayground()
        ]
    })
    await server.start()

    // apply middleware to server
    server.applyMiddleware({ app });

    // app.listen on express server
    app.listen({ port: 4000 }, () => {
        console.log("App is listening on http://localhost:4000");
    })

    // Connect to db


}

bootstrap();