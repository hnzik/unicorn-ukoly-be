export interface CreateShoppingList {
    name: string;
}

export interface AddMemberToShoppingList {
    userId: string;
}

export interface DeleteMemberFromShoppingList {
    userId: string;
}

export interface AddItemToShoppingList {
    shoppingListId: string;
    itemName: string;
}

export interface UpdateItemToShoppingList {
    itemName: string;
    completed: boolean;
}