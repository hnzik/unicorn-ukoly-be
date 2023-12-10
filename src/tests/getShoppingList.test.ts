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

describe('GET /shopping-list/:id', () => {
  it('should return 200 and the specified shopping list', async () => {
    const createdUser = await User.create({
      email: "test@test.cz",
      password: "2203456",
    });

    const jwt = createJWT({ email: createdUser.email, id: createdUser.id, password: "" });

    const createdShoppingList = await ShoppingList.create({
      name: "test",
      owner: createdUser.id,
      users: [],
      items: [],
    });

    const response = await request(app)
      .get(`/api/shopping-list/${createdShoppingList.id}`)
      .set('Authorization', `Bearer ${jwt}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      _id: createdShoppingList.id,
      name: "test",
      owner: createdUser.id,
      users: [],
      items: [],
      createdAt: createdShoppingList.createdAt.toISOString(),
      updatedAt: createdShoppingList.updatedAt.toISOString()
    });
  });

  it('should return 404 if the shopping list is not found', async () => {
    const createdUser = await User.create({
      email: "test@test.cz",
      password: "2203456",
    });
    const nonExistentId = new mongoose.Types.ObjectId();

    const jwt = createJWT({ email: createdUser.email, id: createdUser.id, password: "" });

    const response = await request(app)
      .get(`/api/shopping-list/${nonExistentId}`)
      .set('Authorization', `Bearer ${jwt}`);

    expect(response.status).toBe(404);
  });
});
