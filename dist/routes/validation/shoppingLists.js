"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateItemToShoppingListValidation = exports.getItemFromShoppingListValidation = exports.getShoppingListValidation = exports.itemToShoppingListValidation = exports.addMemberToShoppingListValidation = exports.createShoppingListValidation = exports.deleteMemberFromShoppingListValidation = void 0;
const express_validator_1 = require("express-validator");
const createShoppingListValidation = [
    (0, express_validator_1.body)("name").isString().isLength({ min: 3 }),
];
exports.createShoppingListValidation = createShoppingListValidation;
const getShoppingListValidation = [(0, express_validator_1.query)("id")];
exports.getShoppingListValidation = getShoppingListValidation;
const addMemberToShoppingListValidation = [(0, express_validator_1.body)("userId").isString()];
exports.addMemberToShoppingListValidation = addMemberToShoppingListValidation;
const deleteMemberFromShoppingListValidation = [(0, express_validator_1.query)("id"), (0, express_validator_1.query)("userId")];
exports.deleteMemberFromShoppingListValidation = deleteMemberFromShoppingListValidation;
const itemToShoppingListValidation = [
    (0, express_validator_1.query)("id"),
    (0, express_validator_1.body)("itemName").isString().isLength({ min: 1 }),
];
exports.itemToShoppingListValidation = itemToShoppingListValidation;
const updateItemToShoppingListValidation = [
    (0, express_validator_1.query)("id"),
    (0, express_validator_1.query)("itemId")
];
exports.updateItemToShoppingListValidation = updateItemToShoppingListValidation;
const getItemFromShoppingListValidation = [(0, express_validator_1.query)("itemID").isString().isUUID()];
exports.getItemFromShoppingListValidation = getItemFromShoppingListValidation;
