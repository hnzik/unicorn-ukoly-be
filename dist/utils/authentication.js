"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJWT = exports.createJWT = exports.getJwtFromHeader = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createJWT = (user) => {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error("JWT_SECRET not set");
    }
    return jsonwebtoken_1.default.sign({
        id: user.id,
        email: user.email,
    }, secret, { expiresIn: "1d" });
};
exports.createJWT = createJWT;
const verifyJWT = (token) => {
    const secret = process.env.JWT_SECRET;
    console.log("secret", secret);
    console.log("token", token);
    if (!secret) {
        throw new Error("JWT_SECRET not set");
    }
    return jsonwebtoken_1.default.verify(token, secret);
};
exports.verifyJWT = verifyJWT;
const getJwtFromHeader = (req) => {
    var _a;
    let jwt = req.headers.authorization;
    if (!jwt)
        return null;
    jwt = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    return jwt;
};
exports.getJwtFromHeader = getJwtFromHeader;
