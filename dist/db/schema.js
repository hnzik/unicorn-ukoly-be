"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemsSchema = exports.ShoppingListUsersSchema = exports.ShoppingListSchema = exports.UserSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    activeRoles: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'ShoppingListUsers' }]
});
const shoppingListSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    items: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Items' }],
    users: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'ShoppingListUsers' }]
});
const shoppingListUsersSchema = new mongoose_1.default.Schema({
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User', required: true },
    shoppingListId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'ShoppingList', required: true },
    role: { type: String, required: true }
});
const itemsSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    solved: { type: Boolean, default: false },
    shoppingListId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'ShoppingList', required: true }
});
const UserSchema = mongoose_1.default.model('User', userSchema);
exports.UserSchema = UserSchema;
const ShoppingListSchema = mongoose_1.default.model('ShoppingList', shoppingListSchema);
exports.ShoppingListSchema = ShoppingListSchema;
const ShoppingListUsersSchema = mongoose_1.default.model('ShoppingListUsers', shoppingListUsersSchema);
exports.ShoppingListUsersSchema = ShoppingListUsersSchema;
const ItemsSchema = mongoose_1.default.model('Items', itemsSchema);
exports.ItemsSchema = ItemsSchema;
