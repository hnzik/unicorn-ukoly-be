"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const validate = (req, res) => {
    const result = (0, express_validator_1.validationResult)(req);
    if (!result.isEmpty()) {
        //Re: Validace nevrací chyby (co je na dtoIn chybné).
        //Pole Result obsahuje všechny chyby, které v dtoIn byly oproti schématu. https://express-validator.github.io/docs/api/validation-result
        res.status(400).json({ errors: result.array() });
        return false;
    }
    return true;
};
exports.default = validate;
