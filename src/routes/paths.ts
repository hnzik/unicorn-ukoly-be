const Paths = {
  Base: "/api",
  Auth: {
    Base: "/auth",
    Login: "/login",
    Register: "/register",
  },
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

export default Paths;
