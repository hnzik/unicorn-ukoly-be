"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authValidation = void 0;
const express_validator_1 = require("express-validator");
const authValidation = [
    (0, express_validator_1.body)("email").isString().isLength({ min: 3 }),
    (0, express_validator_1.body)("password").isString().isLength({ min: 3 }),
];
exports.authValidation = authValidation;
