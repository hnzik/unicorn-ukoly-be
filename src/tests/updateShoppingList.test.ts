import request from 'supertest';
import app from '../server'; // Adjust the path as necessary
import User from '../db/schema/User';
import ShoppingList from '../db/schema/ShoppingList';
import { createJWT } from '../utils/authentication';
import mongoose from 'mongoose';

const { connect, clearDatabase, closeDatabase } = require('./db');

beforeAll(async () => await connect());
afterEach(async () => await clearDatabase());
afterAll(async () => await closeDatabase());

describe('PATCH /shopping-list/:id', () => {
  it('should update the shopping list and return 200', async () => {
    const createdUser = await User.create({
      email: "test@test.com",
      password: "123456",
    });

    const jwt = createJWT({ email: createdUser.email, id: createdUser.id, password: "" });

    const shoppingList = await ShoppingList.create({
      name: "Original List",
      owner: createdUser.id,
    });

    const updatedData = { name: "Updated List" };

    const response = await request(app)
      .patch(`/api/shopping-list/${shoppingList.id}`)
      .set('Authorization', `Bearer ${jwt}`)
      .send(updatedData);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe(updatedData.name);
  });

  it('should return 404 if the shopping list is not found', async () => {
    const createdUser = await User.create({
      email: "test@test.com",
      password: "123456",
    });

    const jwt = createJWT({ email: createdUser.email, id: createdUser.id, password: ""  });
   
    const nonExistentId = new mongoose.Types.ObjectId();

    const response = await request(app)
      .patch(`/api/shopping-list/${nonExistentId}`)
      .set('Authorization', `Bearer ${jwt}`)
      .send({ name: "Updated List" });

    expect(response.status).toBe(404);
  });

  it('should return unauthorized 401 for no JWT', async () => {
    const createdUser = await User.create({
      email: "test@test.com",
      password: "123456",
    });

    const shoppingList = await ShoppingList.create({
      name: "Original List",
      owner: createdUser.id,
    });

    const response = await request(app)
      .patch(`/api/shopping-list/${shoppingList.id}`)
      .send({ name: "Updated List" });

    expect(response.status).toBe(401);
  });
});
