import { body, query } from "express-validator";

const createShoppingListValidation = [
  body("name").isString().isLength({ min: 3 }),
];

const getShoppingListValidation = [query("id").isString().isUUID()];

const addMemberToShoppingListValidation = [body("userID").isString().isUUID()];

const itemToShoppingListValidation = [
  body("name").isString().isLength({ min: 1 }),
  body("completed").isBoolean(),
];

const getItemFromShoppingListValidation = [query("itemID").isString().isUUID()];

export {
  createShoppingListValidation,
  addMemberToShoppingListValidation,
  itemToShoppingListValidation,
  getShoppingListValidation,
  getItemFromShoppingListValidation,
};
