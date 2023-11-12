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
exports.addItemToShoppingList = exports.deleteMemberFromShoppingList = exports.deleteShoppingList = exports.addMemberToShoppingList = exports.createShoppingList = exports.getShoppingLists = exports.getShoppingList = void 0;
const validation_1 = __importDefault(require("../utils/validation"));
// TODO: In future if needed, split this file into multiple files
const getShoppingLists = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(0, validation_1.default)(req, res))
        return;
    res.send(req.query);
});
exports.getShoppingLists = getShoppingLists;
const getShoppingList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(0, validation_1.default)(req, res))
        return;
    res.send(req.query);
});
exports.getShoppingList = getShoppingList;
const deleteShoppingList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(0, validation_1.default)(req, res))
        return;
    res.send(req.query);
});
exports.deleteShoppingList = deleteShoppingList;
const createShoppingList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(0, validation_1.default)(req, res))
        return;
    res.send(req.body);
});
exports.createShoppingList = createShoppingList;
const addMemberToShoppingList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(0, validation_1.default)(req, res))
        return;
    res.send(req.body);
});
exports.addMemberToShoppingList = addMemberToShoppingList;
const deleteMemberFromShoppingList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(0, validation_1.default)(req, res))
        return;
    res.send(req.query);
});
exports.deleteMemberFromShoppingList = deleteMemberFromShoppingList;
const addItemToShoppingList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(0, validation_1.default)(req, res))
        return;
    res.send(req.body);
});
exports.addItemToShoppingList = addItemToShoppingList;
