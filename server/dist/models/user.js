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
const mongoose_1 = require("mongoose");
const crypto_1 = __importDefault(require("crypto"));
const util_1 = __importDefault(require("util"));
const pbkdf2 = util_1.default.promisify(crypto_1.default.pbkdf2);
const UserSchema = new mongoose_1.Schema({
    name: String,
    email: { type: String, unique: true },
    profilePic: String,
    salt: String,
    hash: String,
    signingkey: String,
});
UserSchema.methods.pHash = function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        this.salt = crypto_1.default.randomBytes(16).toString('hex');
        const hash = yield pbkdf2(password, this.salt, 1000, 64, 'sha512');
        this.hash = hash.toString('hex');
    });
};
UserSchema.methods.compare = function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        const hash = (yield pbkdf2(password, this.salt, 1000, 64, 'sha512')).toString('hex');
        return this.hash === hash;
    });
};
const UserModel = mongoose_1.model('user', UserSchema);
exports.default = UserModel;
