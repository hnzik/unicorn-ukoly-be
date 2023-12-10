import { IReq, IRes } from "../utils/type";
import validate from "../utils/validation";
import { CreateShoppingList, AddItemToShoppingList, AddMemberToShoppingList, DeleteMemberFromShoppingList, UpdateItemToShoppingList } from "../utils/shoppingListTypes";
import ShoppingListSchema from "../db/schema/ShoppingList";
import {verifyJWT, getJwtFromHeader} from "../utils/authentication";
import Item from "../db/schema/Item";
import User from "../db/schema/User";


const getShoppingLists = async (req: IReq, res: IRes) => {
  if (!validate(req, res)) return;

  const payload = verifyJWT(getJwtFromHeader(req)!)  as {id: string, email: string};

  try {
    const shoppingLists = await ShoppingListSchema.find({$or:[{owner:payload.id},{users: payload.id}]});

    if(shoppingLists.length === 0) {
      return res.status(404).send({ message: 'Shopping lists not found' });
    }

    res.status(200).send(shoppingLists.map(shoppingList => (
      {
        _id: shoppingList._id,
        name: shoppingList.name,
        owner: shoppingList.owner,
        users: shoppingList.users,
        items: shoppingList.items,
        createdAt: shoppingList.createdAt,
        updatedAt: shoppingList.updatedAt
      }
    )));
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const getShoppingList = async (req: IReq<string>, res: IRes) => {
  if (!validate(req, res)) return;

  try {
    const payload = verifyJWT(getJwtFromHeader(req)!)  as {id: string, email: string};

    const shoppingList = await ShoppingListSchema.findOne( { $and: [ { _id: req.params.id }, { $or: [ { owner: payload.id }, { users: payload.id } ] } ] });
    if (!shoppingList) {
      return res.status(404).send({ message: 'Shopping list not found' });
    }

    res.status(200).send({
      _id: shoppingList._id,
      name: shoppingList.name,
      owner: shoppingList.owner,
      users: shoppingList.users,
      items: shoppingList.items,
      createdAt: shoppingList.createdAt,
      updatedAt: shoppingList.updatedAt
    });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const deleteShoppingList = async (req: IReq<DeleteMemberFromShoppingList>, res: IRes) => {
  if (!validate(req, res)) return;

  try {
    const payload = verifyJWT(getJwtFromHeader(req)!)  as {id: string, email: string};

    const deletedShoppingList = await ShoppingListSchema.findOneAndDelete({_id: req.params.id, owner: payload.id});
    if (!deletedShoppingList) {
      return res.status(404).send({ message: 'Shopping list not found' });
    }
    res.status(200).send({ message: 'Shopping list deleted' });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const createShoppingList = async (req: IReq<CreateShoppingList>, res: IRes) => {
  if (!validate(req, res)) return;


  const payload = verifyJWT(getJwtFromHeader(req)!)  as {id: string, email: string};

  const createdShoppingList = await ShoppingListSchema.create({
    name: req.body.name,
    owner: payload.id,
  });

  res.status(201).send(createdShoppingList);
};

const addMemberToShoppingList = async (req: IReq<AddMemberToShoppingList>, res: IRes) => {
  if (!validate(req, res)) return;

  try {
    const payload = verifyJWT(getJwtFromHeader(req)!)  as {id: string, email: string};

    const shoppingList = await ShoppingListSchema.findOne({ _id: req.params.id, owner: payload.id });
    if (!shoppingList) {
      return res.status(404).send({ message: 'Shopping list not found' });
    }

    const userData = await User.findById(req.body.userId);

    if(!userData) {
      return res.status(404).send({ message: 'User not found' });
    }

    shoppingList.users.push(userData._id);
    await shoppingList.save();

    res.status(200).send(shoppingList);
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const deleteMemberFromShoppingList = async (req: IReq<DeleteMemberFromShoppingList>, res: IRes) => {
  if (!validate(req, res)) return;

  try {
    const payload = verifyJWT(getJwtFromHeader(req)!)  as {id: string, email: string};

    const shoppingList = await ShoppingListSchema.findOne({ _id: req.params.id, owner: payload.id });
    if (!shoppingList) {
      return res.status(404).send({ message: 'Shopping list not found' });
    }

    shoppingList.users = shoppingList.users.filter(userId => userId.toString() !== req.params.userId);
    await shoppingList.save();

    res.status(200).send({ message: 'Shopping list deleted' });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const addItemToShoppingList = async (req: IReq<AddItemToShoppingList>, res: IRes) => {
  if (!validate(req, res)) return;

  try {
    const payload = verifyJWT(getJwtFromHeader(req)!)  as {id: string, email: string};

    const shoppingList = await ShoppingListSchema.findOne({ $and: [ { _id: req.params.id }, { $or: [ { owner: payload.id }, { users: payload.id } ] } ] });
    if (!shoppingList) {
      return res.status(404).send({ message: 'Shopping list not found' });
    }

    console.log(shoppingList);

    const newItem = new Item({ name: req.body.itemName, solved: false });
    shoppingList.items.push(newItem);
    await shoppingList.save();

    res.status(201).send(shoppingList);
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const updateItemInShoppingList = async (req: IReq<UpdateItemToShoppingList>, res: IRes) => {
  if (!validate(req, res)) return;

  try {
    const payload = verifyJWT(getJwtFromHeader(req)!)  as {id: string, email: string};

    const shoppingList = await ShoppingListSchema.findOne({ $and: [ { _id: req.params.id }, { $or: [ { owner: payload.id }, { users: payload.id } ] } ] });
    if (!shoppingList) {
      return res.status(404).send({ message: 'Shopping list not found' });
    }

    const item = shoppingList.items.find(item => item._id.toString() === req.params.itemId);
    if(!item) {
      return res.status(404).send({ message: 'Item not found' });
    }

    if(req.body.itemName) item.name = req.body.itemName;
    
    if(req.body.completed != null) item.solved = req.body.completed;

    await shoppingList.save();

    res.status(201).send(shoppingList);
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const deleteItemFromShoppingList = async (req: IReq, res: IRes) => {
  if (!validate(req, res)) return;

  try {
    const payload = verifyJWT(getJwtFromHeader(req)!)  as {id: string, email: string};

    const shoppingList = await ShoppingListSchema.findOne({ $and: [ { _id: req.params.id }, { $or: [ { owner: payload.id }, { users: payload.id } ] } ] });
    if (!shoppingList) {
      return res.status(404).send({ message: 'Shopping list not found' });
    }

    shoppingList.items = shoppingList.items.filter(item => item._id.toString() !== req.params.itemId);
    await shoppingList.save();

    res.status(200).send({ message: 'Shopping list item deleted' });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const updateShoppingList = async (req: IReq<CreateShoppingList>, res: IRes) => {
  if (!validate(req, res)) return;

  try {
    const shoppingList = await ShoppingListSchema.findById(req.params.id);
    if (!shoppingList) {
      return res.status(404).send({ message: 'Shopping list not found' });
    }

    shoppingList.name = req.body.name;
    await shoppingList.save();

    res.status(200).send(shoppingList);
  } catch (error) {
    res.status(500).send({ message: error });
  }
}


export {
  getShoppingList,
  getShoppingLists,
  createShoppingList,
  addMemberToShoppingList,
  deleteShoppingList,
  deleteMemberFromShoppingList,
  addItemToShoppingList,
  updateItemInShoppingList,
  deleteItemFromShoppingList,
  updateShoppingList
};

