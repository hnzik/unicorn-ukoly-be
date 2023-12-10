import request from 'supertest';
import app from '../server';
import User from '../db/schema/User';
import { createJWT } from '../utils/authentication';

const { connect, clearDatabase, closeDatabase } = require('./db');

beforeAll(async () => await connect());
afterEach(async () => await clearDatabase());
afterAll(async () => await closeDatabase());

describe('POST /shopping-list', () => { 
  it('should create a new shopping list and return 201 for valid data', async () => {
    const shoppingListData = { name: "Grocery List" };
    const createdUser = await User.create({
        email: "test@test.com",
        password: "123456",
      });
  
    const jwt = createJWT({ email: createdUser.email, id: createdUser.id, password: "" });

    const response = await request(app)
      .post('/api/shopping-list')
      .set('Authorization', `Bearer ${jwt}`)
      .send(shoppingListData);
    
    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
        name: shoppingListData.name,
        owner: createdUser.id,
        users: [],
        items: [],
    });
  });

  it('should return 400 for invalid data', async () => {
    const invalidData = { name: "ab" };
    const createdUser = await User.create({
        email: "test@test.com",
        password: "123456",
      });
  
    const jwt = createJWT({ email: createdUser.email, id: createdUser.id, password: "" });

    const response = await request(app)
      .post('/api/shopping-list')
      .set('Authorization', `Bearer ${jwt}`)
      .send(invalidData);

    expect(response.status).toBe(400);
  });

  it('should return unauthorized 401', async () => {
    const invalidData = { name: "ab" };

    const response = await request(app)
      .post('/api/shopping-list')
      .send(invalidData);

    expect(response.status).toBe(401);
  });
});
