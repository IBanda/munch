"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const schema_1 = __importDefault(require("./schema"));
const resolvers_1 = __importDefault(require("./resolvers"));
const user_1 = __importDefault(require("./models/user"));
const review_1 = __importDefault(require("./models/review"));
const express_session_1 = __importDefault(require("express-session"));
const connect_mongodb_session_1 = __importDefault(require("connect-mongodb-session"));
const mapClient_1 = __importDefault(require("./lib/mapClient"));
const mocks_1 = __importDefault(require("./utils/mocks"));
const cors_1 = __importDefault(require("cors"));
const graphql_upload_1 = require("graphql-upload");
function apolloExpressServer() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = express_1.default();
        const Store = connect_mongodb_session_1.default(express_session_1.default);
        const store = new Store({
            uri: process.env.MONGO_URI,
            collection: 'session',
        });
        const server = new apollo_server_express_1.ApolloServer({
            typeDefs: schema_1.default,
            resolvers: resolvers_1.default,
            uploads: false,
            context: ({ req, res }) => {
                if (req) {
                    res.header('Access-Control-Allow-Origin', 'https://munch.vercel.app');
                }
                return {
                    mapClient: mapClient_1.default,
                    models: {
                        User: user_1.default,
                        Review: review_1.default,
                    },
                    req,
                };
            },
            mocks: process.env.MOCK ? mocks_1.default : false,
        });
        yield server.start();
        app.use(cors_1.default({
            origin: 'https://munch.vercel.app',
            credentials: true,
        }));
        if (process.env.NODE_ENV === 'production') {
            app.set('trust proxy', true);
        }
        app.use(express_session_1.default({
            secret: process.env.COOKIE_SECRET,
            resave: false,
            saveUninitialized: false,
            store,
            cookie: {
                httpOnly: true,
                secure: true,
                maxAge: 1000 * 60 * 60 * 24 * 7,
            },
        }));
        app.use(graphql_upload_1.graphqlUploadExpress({ maxFileSize: 2000000, maxFiles: 3 }));
        server.applyMiddleware({ app });
        return { server, app };
    });
}
exports.default = apolloExpressServer;
