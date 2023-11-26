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
exports.register = exports.login = void 0;
const authentication_1 = require("../utils/authentication");
const validation_1 = __importDefault(require("../utils/validation"));
const User_1 = __importDefault(require("../db/schema/User"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(0, validation_1.default)(req, res))
        return;
    const user = yield User_1.default.findOne({ email: req.body.email, password: req.body.password });
    if (!user)
        return res.status(401).send("Invalid email or password");
    const jwt = (0, authentication_1.createJWT)({ email: user.email, id: user.id, password: "" });
    res.send({ token: jwt });
});
exports.login = login;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(0, validation_1.default)(req, res))
        return;
    const user = yield User_1.default.findOne({ email: req.body.email });
    if (!user)
        return res.status(400).send("User already exists");
    var createdUser = yield User_1.default.create({
        email: req.body.email,
        password: req.body.password,
    });
    const jwt = (0, authentication_1.createJWT)({ email: createdUser.email, id: createdUser.id, password: "" });
    res.send({ token: jwt });
});
exports.register = register;
