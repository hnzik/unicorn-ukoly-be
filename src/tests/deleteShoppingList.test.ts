import request from 'supertest';
import app from '../server';
import User from '../db/schema/User';
import ShoppingList from '../db/schema/ShoppingList';
import { createJWT } from '../utils/authentication';
import mongoose from 'mongoose';

const { connect, clearDatabase, closeDatabase } = require('./db');

beforeAll(async () => await connect());
afterEach(async () => await clearDatabase());
afterAll(async () => await closeDatabase());

describe('DELETE /shopping-list/:id', () => {
  it('should delete the shopping list and return 200', async () => {
    const createdUser = await User.create({
        email: "test@test.com",
        password: "123456",
      });

    const createdShoppingList = await ShoppingList.create({
        name: "Grocery List",
        owner: createdUser.id,
      });

    const jwt = createJWT({ email: createdUser.email, id: createdUser.id, password: "" });

    const response = await request(app)
      .delete(`/api/shopping-list/${createdShoppingList.id}`)
      .set('Authorization', `Bearer ${jwt}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Shopping list deleted');

    //Did we really delete the shopping list?
    const shoppingList = await ShoppingList.findById(createdShoppingList.id);
    expect(shoppingList).toBeFalsy();

  });

  it('should return 404 if the shopping list is not found', async () => {
    const createdUser = await User.create({
        email: "test@test.com",
        password: "123456",
      });

    
    const nonExistentId = new mongoose.Types.ObjectId();

    const jwt = createJWT({ email: createdUser.email, id: createdUser.id, password: "" });

    const response = await request(app)
      .delete(`/api/shopping-list/${nonExistentId}`)
      .set('Authorization', `Bearer ${jwt}`);

    expect(response.status).toBe(404);
  });

  it('should return unauthorized 401 for no JWT', async () => {
    const createdUser = await User.create({
        email: "test@test.com",
        password: "123456",
      });
      
    const createdShoppingList = await ShoppingList.create({
        name: "Grocery List",
        owner: createdUser.id,
      });

    const response = await request(app)
      .delete(`/api/shopping-list/${createdShoppingList.id}`);

    expect(response.status).toBe(401);
  });
});
