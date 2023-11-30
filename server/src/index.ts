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

async function bootstrap(){
    // Build the schema
    // const schema = buildSchema({
    //     //resolvers,
    //     //authChecker
    // })
    // Init express
    const app = express();
    app.use(cookieParser())
    // Create the apollo server
    const server = new ApolloServer({
        //schema,   19:56
        context: (ctx: any) => {
            return ctx
        },
        plugins: [
            process.env.NODE_ENV === 'production' ? ApolloServerPluginLandingPageProductionDefault() : ApolloServerPluginLandingPageGraphQLPlayground()
        ]
    })
    await server.start()

    // apply middleware to server

    // app.listen on express server


}

bootstrap();