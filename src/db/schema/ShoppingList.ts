
import mongoose, { Schema, Document } from 'mongoose';
import { IItem } from './Item'; 
import { itemSchema } from './Item';  // Import the schema, not the model

interface IShoppingList extends Document {
  name: string;
  owner: mongoose.Types.ObjectId;
  users: mongoose.Types.ObjectId[];
  items: IItem[];
}

const shoppingListSchema = new Schema<IShoppingList>({
  name: { type: String, required: true, trim: true },
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  items: [itemSchema]
}, { timestamps: true });

const ShoppingList = mongoose.model<IShoppingList>('ShoppingList', shoppingListSchema);
export default ShoppingList;