import { Router } from "express";
import Paths from "./paths";
import {
  itemToShoppingListValidation,
  createShoppingListValidation,
  addMemberToShoppingListValidation,
  getShoppingListValidation,
} from "./validation/shoppingLists";
import { expressjwt } from "express-jwt";
import dotnenv from "dotenv";
import { authValidation } from "./validation/auth";
import {
  deleteShoppingList,
  getShoppingList,
  getShoppingLists,
  createShoppingList,
  addMemberToShoppingList,
  deleteMemberFromShoppingList,
  addItemToShoppingList,
} from "../controllers/shoppingList";
import { login, register } from "../controllers/auth";

dotnenv.config();

const apiRouter = Router({});

apiRouter.use(
  Paths.ShoppingList.Lists,
  expressjwt({
    secret: process.env.JWT_SECRET ?? "",
    algorithms: ["HS256"],
  }),
  getShoppingLists
);

const authRouter = Router();

authRouter.post(Paths.Auth.Register, authValidation, register);
authRouter.post(Paths.Auth.Login, authValidation, login);

apiRouter.use(Paths.Auth.Base, authRouter);

const shoppingListRouter = Router();

shoppingListRouter.get(
  Paths.ShoppingList.Get,
  getShoppingListValidation,
  getShoppingList
);

shoppingListRouter.delete(
  Paths.ShoppingList.Delete,
  getShoppingListValidation,
  deleteShoppingList
);

shoppingListRouter.post("", createShoppingListValidation, createShoppingList);

shoppingListRouter.post(
  Paths.ShoppingList.Members.Base,
  addMemberToShoppingListValidation,
  addMemberToShoppingList
);

shoppingListRouter.delete(
  Paths.ShoppingList.Members.Delete,
  addMemberToShoppingListValidation,
  deleteMemberFromShoppingList
);

shoppingListRouter.post(
  Paths.ShoppingList.Items.Base,
  itemToShoppingListValidation,
  addItemToShoppingList
);

shoppingListRouter.patch(
  Paths.ShoppingList.Items.Patch,
  itemToShoppingListValidation,
  addItemToShoppingList
);

shoppingListRouter.delete(
  Paths.ShoppingList.Items.Delete,
  itemToShoppingListValidation,
  addItemToShoppingList
);

apiRouter.use(
  Paths.ShoppingList.Base,
  expressjwt({
    secret: process.env.JWT_SECRET ?? "",
    algorithms: ["HS256"],
  }),
  shoppingListRouter
);

export default apiRouter;
