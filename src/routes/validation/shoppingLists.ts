import { body, query } from "express-validator";

const createShoppingListValidation = [
  body("name").isString().isLength({ min: 3 }),
];

const getShoppingListValidation = [query("id")];

const addMemberToShoppingListValidation = [body("userId").isString()];

const deleteMemberFromShoppingListValidation = [query("id"), query("userId")];

const itemToShoppingListValidation = [
  query("id"),
  body("itemName").isString().isLength({ min: 1 }),
];

const updateItemToShoppingListValidation = [
  query("id"),
  query("itemId")
];


const getItemFromShoppingListValidation = [query("itemID").isString().isUUID()];

export {
  deleteMemberFromShoppingListValidation,
  createShoppingListValidation,
  addMemberToShoppingListValidation,
  itemToShoppingListValidation,
  getShoppingListValidation,
  getItemFromShoppingListValidation,
  updateItemToShoppingListValidation
};
