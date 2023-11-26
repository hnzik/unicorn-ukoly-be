"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateShoppingList = exports.deleteItemFromShoppingList = exports.updateItemInShoppingList = exports.addItemToShoppingList = exports.deleteMemberFromShoppingList = exports.deleteShoppingList = exports.addMemberToShoppingList = exports.createShoppingList = exports.getShoppingLists = exports.getShoppingList = void 0;
const validation_1 = __importDefault(require("../utils/validation"));
const ShoppingList_1 = __importDefault(require("../db/schema/ShoppingList"));
const authentication_1 = require("../utils/authentication");
const Item_1 = __importDefault(require("../db/schema/Item"));
const User_1 = __importDefault(require("../db/schema/User"));
const getShoppingLists = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(0, validation_1.default)(req, res))
        return;
    const payload = (0, authentication_1.verifyJWT)((0, authentication_1.getJwtFromHeader)(req));
    try {
        const shoppingLists = yield ShoppingList_1.default.find({ $or: [{ owner: payload.id }, { users: payload.id }] });
        res.status(200).send(shoppingLists);
    }
    catch (error) {
        res.status(500).send({ message: error });
    }
});
exports.getShoppingLists = getShoppingLists;
const getShoppingList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(0, validation_1.default)(req, res))
        return;
    try {
        const payload = (0, authentication_1.verifyJWT)((0, authentication_1.getJwtFromHeader)(req));
        const shoppingList = yield ShoppingList_1.default.find({ $and: [{ _id: req.params.id }, { $or: [{ owner: payload.id }, { users: payload.id }] }] });
        if (!shoppingList) {
            return res.status(404).send({ message: 'Shopping list not found' });
        }
        res.status(200).send(shoppingList);
    }
    catch (error) {
        res.status(500).send({ message: error });
    }
});
exports.getShoppingList = getShoppingList;
const deleteShoppingList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(0, validation_1.default)(req, res))
        return;
    try {
        const payload = (0, authentication_1.verifyJWT)((0, authentication_1.getJwtFromHeader)(req));
        const deletedShoppingList = yield ShoppingList_1.default.findOneAndDelete({ _id: req.params.id, owner: payload.id });
        if (!deletedShoppingList) {
            return res.status(404).send({ message: 'Shopping list not found' });
        }
        res.status(200).send({ message: 'Shopping list deleted' });
    }
    catch (error) {
        res.status(500).send({ message: error });
    }
});
exports.deleteShoppingList = deleteShoppingList;
const createShoppingList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(0, validation_1.default)(req, res))
        return;
    const payload = (0, authentication_1.verifyJWT)((0, authentication_1.getJwtFromHeader)(req));
    const createdShoppingList = yield ShoppingList_1.default.create({
        name: req.body.name,
        owner: payload.id,
    });
    res.status(201).send(createdShoppingList);
});
exports.createShoppingList = createShoppingList;
const addMemberToShoppingList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(0, validation_1.default)(req, res))
        return;
    try {
        const payload = (0, authentication_1.verifyJWT)((0, authentication_1.getJwtFromHeader)(req));
        const shoppingList = yield ShoppingList_1.default.findOne({ _id: req.params.id, owner: payload.id });
        if (!shoppingList) {
            return res.status(404).send({ message: 'Shopping list not found' });
        }
        const userData = yield User_1.default.findById(req.body.userId);
        if (!userData) {
            return res.status(404).send({ message: 'User not found' });
        }
        shoppingList.users.push(userData._id);
        yield shoppingList.save();
        res.status(200).send(shoppingList);
    }
    catch (error) {
        res.status(500).send({ message: error });
    }
});
exports.addMemberToShoppingList = addMemberToShoppingList;
const deleteMemberFromShoppingList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(0, validation_1.default)(req, res))
        return;
    try {
        const payload = (0, authentication_1.verifyJWT)((0, authentication_1.getJwtFromHeader)(req));
        const shoppingList = yield ShoppingList_1.default.findOne({ _id: req.params.id, owner: payload.id });
        if (!shoppingList) {
            return res.status(404).send({ message: 'Shopping list not found' });
        }
        shoppingList.users = shoppingList.users.filter(userId => userId.toString() !== req.params.userId);
        yield shoppingList.save();
        res.status(200).send({ message: 'Shopping list deleted' });
    }
    catch (error) {
        res.status(500).send({ message: error });
    }
});
exports.deleteMemberFromShoppingList = deleteMemberFromShoppingList;
const addItemToShoppingList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(0, validation_1.default)(req, res))
        return;
    try {
        const payload = (0, authentication_1.verifyJWT)((0, authentication_1.getJwtFromHeader)(req));
        const shoppingList = yield ShoppingList_1.default.findOne({ $and: [{ _id: req.params.id }, { $or: [{ owner: payload.id }, { users: payload.id }] }] });
        if (!shoppingList) {
            return res.status(404).send({ message: 'Shopping list not found' });
        }
        console.log(shoppingList);
        const newItem = new Item_1.default({ name: req.body.itemName, solved: false });
        shoppingList.items.push(newItem);
        yield shoppingList.save();
        res.status(201).send(shoppingList);
    }
    catch (error) {
        res.status(500).send({ message: error });
    }
});
exports.addItemToShoppingList = addItemToShoppingList;
const updateItemInShoppingList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(0, validation_1.default)(req, res))
        return;
    try {
        const payload = (0, authentication_1.verifyJWT)((0, authentication_1.getJwtFromHeader)(req));
        const shoppingList = yield ShoppingList_1.default.findOne({ $and: [{ _id: req.params.id }, { $or: [{ owner: payload.id }, { users: payload.id }] }] });
        if (!shoppingList) {
            return res.status(404).send({ message: 'Shopping list not found' });
        }
        const item = shoppingList.items.find(item => item._id.toString() === req.params.itemId);
        if (!item) {
            return res.status(404).send({ message: 'Item not found' });
        }
        if (req.body.itemName)
            item.name = req.body.itemName;
        if (req.body.completed != null)
            item.solved = req.body.completed;
        yield shoppingList.save();
        res.status(201).send(shoppingList);
    }
    catch (error) {
        res.status(500).send({ message: error });
    }
});
exports.updateItemInShoppingList = updateItemInShoppingList;
const deleteItemFromShoppingList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(0, validation_1.default)(req, res))
        return;
    try {
        const payload = (0, authentication_1.verifyJWT)((0, authentication_1.getJwtFromHeader)(req));
        const shoppingList = yield ShoppingList_1.default.findOne({ $and: [{ _id: req.params.id }, { $or: [{ owner: payload.id }, { users: payload.id }] }] });
        if (!shoppingList) {
            return res.status(404).send({ message: 'Shopping list not found' });
        }
        shoppingList.items = shoppingList.items.filter(item => item._id.toString() !== req.params.itemId);
        yield shoppingList.save();
        res.status(200).send({ message: 'Shopping list item deleted' });
    }
    catch (error) {
        res.status(500).send({ message: error });
    }
});
exports.deleteItemFromShoppingList = deleteItemFromShoppingList;
const updateShoppingList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(0, validation_1.default)(req, res))
        return;
    try {
        const shoppingList = yield ShoppingList_1.default.findById(req.params.id);
        if (!shoppingList) {
            return res.status(404).send({ message: 'Shopping list not found' });
        }
        shoppingList.name = req.body.name;
        yield shoppingList.save();
        res.status(200).send(shoppingList);
    }
    catch (error) {
        res.status(500).send({ message: error });
    }
});
exports.updateShoppingList = updateShoppingList;
