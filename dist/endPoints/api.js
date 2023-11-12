"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const paths_1 = __importDefault(require("./paths"));
const shoppingLists_1 = require("./validation/shoppingLists");
const shoppingList_1 = require("../controllers/shoppingList");
const apiRouter = (0, express_1.Router)({});
apiRouter.use(paths_1.default.ShoppingList.Lists, shoppingList_1.getShoppingLists);
const shoppingListRouter = (0, express_1.Router)();
shoppingListRouter.get(paths_1.default.ShoppingList.Get, shoppingLists_1.getShoppingListValidation, shoppingList_1.getShoppingList);
shoppingListRouter.delete(paths_1.default.ShoppingList.Delete, shoppingLists_1.getShoppingListValidation, shoppingList_1.deleteShoppingList);
shoppingListRouter.post("", shoppingLists_1.createShoppingListValidation, shoppingList_1.createShoppingList);
shoppingListRouter.post(paths_1.default.ShoppingList.Members.Base, shoppingLists_1.addMemberToShoppingListValidation, shoppingList_1.addMemberToShoppingList);
shoppingListRouter.delete(paths_1.default.ShoppingList.Members.Delete, shoppingLists_1.addMemberToShoppingListValidation, shoppingList_1.deleteMemberFromShoppingList);
shoppingListRouter.post(paths_1.default.ShoppingList.Items.Base, shoppingLists_1.itemToShoppingListValidation, shoppingList_1.addItemToShoppingList);
shoppingListRouter.patch(paths_1.default.ShoppingList.Items.Patch, shoppingLists_1.itemToShoppingListValidation, shoppingList_1.addItemToShoppingList);
shoppingListRouter.delete(paths_1.default.ShoppingList.Items.Delete, shoppingLists_1.itemToShoppingListValidation, shoppingList_1.addItemToShoppingList);
apiRouter.use(paths_1.default.ShoppingList.Base, shoppingListRouter);
exports.default = apiRouter;
