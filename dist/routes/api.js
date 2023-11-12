"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const paths_1 = __importDefault(require("./paths"));
const shoppingLists_1 = require("./validation/shoppingLists");
const express_jwt_1 = require("express-jwt");
const dotenv_1 = __importDefault(require("dotenv"));
const auth_1 = require("./validation/auth");
const shoppingList_1 = require("../controllers/shoppingList");
const auth_2 = require("../controllers/auth");
dotenv_1.default.config();
const apiRouter = (0, express_1.Router)({});
apiRouter.use(paths_1.default.ShoppingList.Lists, (0, express_jwt_1.expressjwt)({
    secret: (_a = process.env.JWT_SECRET) !== null && _a !== void 0 ? _a : "",
    algorithms: ["HS256"],
}), shoppingList_1.getShoppingLists);
const authRouter = (0, express_1.Router)();
authRouter.post(paths_1.default.Auth.Register, auth_1.authValidation, auth_2.register);
authRouter.post(paths_1.default.Auth.Login, auth_1.authValidation, auth_2.login);
apiRouter.use(paths_1.default.Auth.Base, authRouter);
const shoppingListRouter = (0, express_1.Router)();
shoppingListRouter.get(paths_1.default.ShoppingList.Get, shoppingLists_1.getShoppingListValidation, shoppingList_1.getShoppingList);
shoppingListRouter.delete(paths_1.default.ShoppingList.Delete, shoppingLists_1.getShoppingListValidation, shoppingList_1.deleteShoppingList);
shoppingListRouter.post("", shoppingLists_1.createShoppingListValidation, shoppingList_1.createShoppingList);
shoppingListRouter.post(paths_1.default.ShoppingList.Members.Base, shoppingLists_1.addMemberToShoppingListValidation, shoppingList_1.addMemberToShoppingList);
shoppingListRouter.delete(paths_1.default.ShoppingList.Members.Delete, shoppingLists_1.addMemberToShoppingListValidation, shoppingList_1.deleteMemberFromShoppingList);
shoppingListRouter.post(paths_1.default.ShoppingList.Items.Base, shoppingLists_1.itemToShoppingListValidation, shoppingList_1.addItemToShoppingList);
shoppingListRouter.patch(paths_1.default.ShoppingList.Items.Patch, shoppingLists_1.itemToShoppingListValidation, shoppingList_1.addItemToShoppingList);
shoppingListRouter.delete(paths_1.default.ShoppingList.Items.Delete, shoppingLists_1.itemToShoppingListValidation, shoppingList_1.addItemToShoppingList);
apiRouter.use(paths_1.default.ShoppingList.Base, (0, express_jwt_1.expressjwt)({
    secret: (_b = process.env.JWT_SECRET) !== null && _b !== void 0 ? _b : "",
    algorithms: ["HS256"],
}), shoppingListRouter);
exports.default = apiRouter;
