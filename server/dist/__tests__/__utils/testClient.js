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
exports.testClient = exports.gql = void 0;
const apollo_server_express_1 = require("apollo-server-express");
Object.defineProperty(exports, "gql", { enumerable: true, get: function () { return apollo_server_express_1.gql; } });
const apollo_server_integration_testing_1 = require("apollo-server-integration-testing");
const server_1 = __importDefault(require("../../server"));
function testClient() {
    return __awaiter(this, void 0, void 0, function* () {
        const { server } = yield server_1.default();
        const { query, mutate, setOptions } = apollo_server_integration_testing_1.createTestClient({
            apolloServer: server,
        });
        setOptions({
            request: {
                session: {},
            },
        });
        return { query, mutate };
    });
}
exports.testClient = testClient;
