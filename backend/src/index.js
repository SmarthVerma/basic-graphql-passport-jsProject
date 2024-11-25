import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import dotenv from "dotenv";
import http from "http";
import cors from "cors";
import { dbConnect } from "./db/dbConnect.js";

import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';


// grahql imports
import allTypeDefs from './typeDefs/index.js'; // Import the typeDefs
import allResolvers from './resolvers/index.js'; // Import resolvers here



import pool from "./pgPool.js";
import connectPgSimple from 'connect-pg-simple';
import session from "express-session";
import { buildContext } from "graphql-passport";
import passport from "passport";
import { configurePassport } from "./passport/config.js";

configurePassport()
dotenv.config()

const app = express();
const httpServer = http.createServer(app)
const port = process.env.PORT

const pgSession = connectPgSimple(session)

const store = new pgSession({
    pool,
    tableName: 'Session',
})

const server = new ApolloServer({
    typeDefs: allTypeDefs,
    resolvers: allResolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
})

//middlewares

app.use(cors({
    origin: `http://localhost:5173`, // Removed trailing slash
    credentials: true, // Allow cookies to be sent/received eg - res.clearCookies()
}));

app.use(express.json()); // Make sure JSON body parsing is applied globally


app.use(session({
    secret: process.env.SESSION_SECERT,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
        httpOnly: true,
    },
    store: store,
}));

app.use(passport.initialize())
app.use(passport.session())

await server.start();

app.use("/graphql",
    expressMiddleware(server, {
        context: async ({ req, res }) => buildContext({ req, res }),
    })
)


httpServer.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}/graphql`);
});

console.log('CheckBefore');
await dbConnect(); // Connect to database
