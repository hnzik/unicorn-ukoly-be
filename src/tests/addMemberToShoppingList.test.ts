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

describe('POST /shopping-list/:id/members', () => {
  it('should add a member to the shopping list and return 200', async () => {
    const ownerUser = await User.create({
      email: "owner@test.com",
      password: "123456",
    });
    const memberUser = await User.create({
      email: "member@test.com",
      password: "123456",
    });
    const jwt = createJWT({ email: ownerUser.email, id: ownerUser.id, password: "" });

    const shoppingList = await ShoppingList.create({
      name: "Grocery List",
      owner: ownerUser.id,
      users: [],
    });

    const response = await request(app)
      .post(`/api/shopping-list/${shoppingList.id}/members`)
      .set('Authorization', `Bearer ${jwt}`)
      .send({ userId: memberUser.id });

    expect(response.status).toBe(200);
    expect(response.body.users).toContain(memberUser.id);
  });

  it('should return 404 if the shopping list is not found', async () => {
    const ownerUser = await User.create({
      email: "owner@test.com",
      password: "123456",
    });
    const jwt = createJWT({ email: ownerUser.email, id: ownerUser.id, password: "" });

    const nonExistentId = new mongoose.Types.ObjectId();
    
    const memberUser = await User.create({
      email: "member@test.com",
      password: "123456",
    });

    const response = await request(app)
      .post(`/api/shopping-list/${nonExistentId}/members`)
      .set('Authorization', `Bearer ${jwt}`)
      .send({ userId: memberUser.id });

    expect(response.status).toBe(404);
  });

  it('should return 404 if the member to be added is not found', async () => {
    const ownerUser = await User.create({
      email: "owner@test.com",
      password: "123456",
    });
    const jwt = createJWT({ email: ownerUser.email, id: ownerUser.id, password: "" });

    const shoppingList = await ShoppingList.create({
      name: "Grocery List",
      owner: ownerUser.id,
      users: [],
    });

    const nonExistentUserId = new mongoose.Types.ObjectId();

    const response = await request(app)
      .post(`/api/shopping-list/${shoppingList.id}/members`)
      .set('Authorization', `Bearer ${jwt}`)
      .send({ userId: nonExistentUserId });

    expect(response.status).toBe(404);
  });

  it('should return unauthorized 401 for no JWT', async () => {
    const ownerUser = await User.create({
      email: "owner@test.com",
      password: "123456",
    });
    const shoppingList = await ShoppingList.create({
      name: "Grocery List",
      owner: ownerUser.id,
      users: [],
    });
    const memberUser = await User.create({
      email: "member@test.com",
      password: "123456",
    });

    const response = await request(app)
      .post(`/api/shopping-list/${shoppingList.id}/members`)
      .send({ userId: memberUser.id });

    expect(response.status).toBe(401);
  });
});
