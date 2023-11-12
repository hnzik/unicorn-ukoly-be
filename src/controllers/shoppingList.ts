import { IReq, IRes } from "../utils/type";
import validate from "../utils/validation";

// TODO: In future if needed, split this file into multiple files

const getShoppingLists = async (req: IReq, res: IRes) => {
  if (!validate(req, res)) return;

  res.send(req.query);
};

const getShoppingList = async (req: IReq<string>, res: IRes) => {
  if (!validate(req, res)) return;

  res.send(req.query);
};

const deleteShoppingList = async (req: IReq<string>, res: IRes) => {
  if (!validate(req, res)) return;

  res.send(req.query);
};

const createShoppingList = async (req: IReq<string>, res: IRes) => {
  if (!validate(req, res)) return;

  res.send(req.body);
};

const addMemberToShoppingList = async (req: IReq<string>, res: IRes) => {
  if (!validate(req, res)) return;

  res.send(req.body);
};

const deleteMemberFromShoppingList = async (req: IReq<string>, res: IRes) => {
  if (!validate(req, res)) return;

  res.send(req.query);
};

const addItemToShoppingList = async (req: IReq<string>, res: IRes) => {
  if (!validate(req, res)) return;

  res.send(req.body);
};

export {
  getShoppingList,
  getShoppingLists,
  createShoppingList,
  addMemberToShoppingList,
  deleteShoppingList,
  deleteMemberFromShoppingList,
  addItemToShoppingList,
};
