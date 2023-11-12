"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getItemFromShoppingListValidation = exports.getShoppingListValidation = exports.itemToShoppingListValidation = exports.addMemberToShoppingListValidation = exports.createShoppingListValidation = void 0;
const express_validator_1 = require("express-validator");
const createShoppingListValidation = [
    (0, express_validator_1.body)("name").isString().isLength({ min: 3 }),
];
exports.createShoppingListValidation = createShoppingListValidation;
const getShoppingListValidation = [(0, express_validator_1.query)("id").isString().isUUID()];
exports.getShoppingListValidation = getShoppingListValidation;
const addMemberToShoppingListValidation = [(0, express_validator_1.body)("userID").isString().isUUID()];
exports.addMemberToShoppingListValidation = addMemberToShoppingListValidation;
const itemToShoppingListValidation = [
    (0, express_validator_1.body)("name").isString().isLength({ min: 1 }),
    (0, express_validator_1.body)("completed").isBoolean(),
];
exports.itemToShoppingListValidation = itemToShoppingListValidation;
const getItemFromShoppingListValidation = [(0, express_validator_1.query)("itemID").isString().isUUID()];
exports.getItemFromShoppingListValidation = getItemFromShoppingListValidation;
