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

describe('POST /shopping-list/:id/items', () => {
  it('should add an item to the shopping list and return 201', async () => {
    const createdUser = await User.create({
      email: "test@test.com",
      password: "123456",
    });

    const jwt = createJWT({ email: createdUser.email, id: createdUser.id, password: "" });

    const shoppingList = await ShoppingList.create({
      name: "Grocery List",
      owner: createdUser.id,
      items: [],
    });

    const itemData = { itemName: "Milk" };

    const response = await request(app)
      .post(`/api/shopping-list/${shoppingList.id}/items`)
      .set('Authorization', `Bearer ${jwt}`)
      .send(itemData);

    expect(response.status).toBe(201);
    expect(response.body.items).toContainEqual(
      expect.objectContaining({ name: itemData.itemName, solved: false })
    );
  });

  it('should return 404 if the shopping list is not found', async () => {
    const createdUser = await User.create({
      email: "test@test.com",
      password: "123456",
    });

    const jwt = createJWT({ email: createdUser.email, id: createdUser.id, password: "" });
    const nonExistentId = new mongoose.Types.ObjectId();

    const response = await request(app)
      .post(`/api/shopping-list/${nonExistentId}/items`)
      .set('Authorization', `Bearer ${jwt}`)
      .send({ itemName: "Bread" });

    expect(response.status).toBe(404);
  });

  it('should return unauthorized 401 for no JWT', async () => {
    const createdUser = await User.create({
      email: "test@test.com",
      password: "123456",
    });

    const shoppingList = await ShoppingList.create({
      name: "Grocery List",
      owner: createdUser.id,
      items: [],
    });

    const response = await request(app)
      .post(`/api/shopping-list/${shoppingList.id}/items`)
      .send({ itemName: "Bread" });

    expect(response.status).toBe(401);
  });
});
