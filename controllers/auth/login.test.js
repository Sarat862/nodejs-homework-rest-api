const mongoose = require('mongoose');
const request = require('supertest');
const bcrypt = require('bcrypt');

require('dotenv').config();

const app = require('../../app');
const { User } = require('../../models/user');

const { DB_HOST_TEST, PORT } = process.env;

describe("test auth routes", () => {
    let server;
    beforeAll(() => { server = app.listen(PORT) });
    afterAll(() => server.close());

    beforeEach((done) => {
        mongoose.connect(DB_HOST_TEST).then(() => done());
    });

    // afterEach((done) => {    
    //     mongoose.connection.db.dropCollection(() => {
    //         mongoose.connection.close(() => done());
    //     })
    // });

    test("test login route", async () => {
        const newUser = {
            email: "test@mail.com",
            password: await bcrypt.hash("123456", 10)
        }
        
        const user = await User.create(newUser);

        const loginUser = {
            email: "test@mail.com",
            password: "123456"
        }

        const response = await request(app).post('/api/users/login').send(loginUser);

        // Відповідь повина мати статус-код 200
        expect(response.statusCode).toBe(200);

        // У відповіді повинен повертатися токен
        const { body } = response;
        expect(body.token).toBeTruthy();
        const { token } = await User.findById(user._id);
        expect(body.token).toBe(token);

        // У відповіді повинен повертатися об'єкт user з 2 полями email и subscription з типом даних String
        const email = body.user.email;
        const subscription = body.user.subscription;
        expect((body.user)).toEqual({email, subscription});
        expect(typeof email).toBe("string");
        expect(typeof subscription).toBe("string");
    })  
});