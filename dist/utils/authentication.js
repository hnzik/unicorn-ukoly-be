"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJWT = exports.createJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createJWT = (user) => {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error("JWT_SECRET not set");
    }
    return jsonwebtoken_1.default.sign({
        id: user.id,
        username: user.name,
    }, secret, { expiresIn: "1d" });
};
exports.createJWT = createJWT;
const verifyJWT = (token) => {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error("JWT_SECRET not set");
    }
    return jsonwebtoken_1.default.verify(token, secret);
};
exports.verifyJWT = verifyJWT;
