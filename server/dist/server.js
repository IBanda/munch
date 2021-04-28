"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const schema_1 = __importDefault(require("./schema"));
const resolvers_1 = __importDefault(require("./resolvers"));
const google_maps_services_js_1 = require("@googlemaps/google-maps-services-js");
const client = new google_maps_services_js_1.Client({});
const server = new apollo_server_1.ApolloServer({
    typeDefs: schema_1.default,
    resolvers: resolvers_1.default,
    context: () => ({
        gMap: client,
    }),
});
server
    .listen({
    port: process.env.PORT || 4000,
})
    .then(({ url }) => {
    console.log(`Server running at: ${url}`);
});
