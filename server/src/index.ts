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
import { connectToMongo } from "./utils/mongo";
import { verifyJwt } from "./utils/jwt";
import authChecker from "./utils/authChecker";
import { User } from "./schema/user.schema";
import Context from "./types/context";

async function bootstrap(){
    
    const schema = await buildSchema({
        resolvers,
        authChecker
    })
    
    const app = express();
    app.use(cookieParser())
    
    const server = new ApolloServer({
        schema,
        context: (ctx: Context) => {
            const context = ctx
            const token = ctx.req.headers.authorization?.split(' ')[1];
            if(token) {
                const user = verifyJwt<User>(token)
                context.user = user
            }
            return ctx;
        },
        plugins: [
            process.env.NODE_ENV === 'production' ? ApolloServerPluginLandingPageProductionDefault() : ApolloServerPluginLandingPageGraphQLPlayground()
        ]
    })
    await server.start()

    server.applyMiddleware({ app });

    app.listen({ port: 4000 }, () => {
        console.log("App is listening on http://localhost:4000");
    })

    connectToMongo();

}

bootstrap();