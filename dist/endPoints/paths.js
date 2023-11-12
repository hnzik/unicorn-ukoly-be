"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Paths = {
    Base: "/api",
    ShoppingList: {
        Base: "/shopping-list",
        Lists: "/shopping-lists",
        Get: "/:id",
        Delete: "/:id",
        Members: {
            Base: "/:id/members",
            Get: "/:id/members/:userId",
            Delete: "/:id/members/:userId",
        },
        Items: {
            Base: "/:id/items",
            Patch: "/:id/items/:itemId",
            Delete: "/:id/items/:itemId",
        },
    },
};
exports.default = Paths;
