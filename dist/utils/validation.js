"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const validate = (req, res) => {
    const result = (0, express_validator_1.validationResult)(req);
    if (!result.isEmpty()) {
        res.status(400).json({ errors: result.array() });
        return false;
    }
    return true;
};
exports.default = validate;
