import User from '../db/schema/User';
import ShoppingList from '../db/schema/ShoppingList';
import { createJWT } from '../utils/authentication'
import app from '../server';
import request from 'supertest';

const { connect, clearDatabase, closeDatabase } = require('./db');

beforeAll(async () => await connect())
afterEach(async () => await clearDatabase())
afterAll(async () => await closeDatabase())

describe('GET /shopping-lists', () => {
    it('should return 200 and a list of shopping lists', async () => {
        var createdUser = await User.create({
            email: "test@test.cz",
            password: "2203456",
        });
        
        const jwt = createJWT({email:createdUser.email, id: createdUser.id, password: ""});
        

        var createdShoppingList = await ShoppingList.create({
            name: "test",
            owner: createdUser.id,
        });

        const response = (await request(app).get('/api/shopping-lists').set('Authorization', "Bearer " + jwt));

        expect(response.status).toBe(200);
        expect(response.body).toEqual([{ _id: createdShoppingList.id, 
        name: "test", 
        owner: createdUser.id, users: [], items: [], 
        createdAt: createdShoppingList.createdAt.toISOString(), 
        updatedAt: createdShoppingList.updatedAt.toISOString()}]);
    });

    it('should return 404 if no shopping lists are found', async () => {
        var createdUser = await User.create({
            email: "test@test.cz",
            password: "2203456",
        });
        
        const jwt = createJWT({email:createdUser.email, id: createdUser.id, password: ""});
        
        const response = (await request(app).get('/api/shopping-lists').set('Authorization', "Bearer " + jwt));

        expect(response.status).toBe(404);
      });
  });