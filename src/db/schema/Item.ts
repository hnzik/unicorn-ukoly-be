import mongoose, { Schema, Document } from 'mongoose';

export interface IItem extends Document {
  name: string;
  solved: boolean;
}

const itemSchema = new Schema<IItem>({
  name: { type: String, required: true, trim: true },
  solved: { type: Boolean, default: false }
}, { timestamps: true });

const Item = mongoose.model<IItem>('Item', itemSchema);
export default Item;
export { itemSchema }; 
