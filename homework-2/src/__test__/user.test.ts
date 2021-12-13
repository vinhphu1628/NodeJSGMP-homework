import request from 'supertest';
import app from '../app';

const mockUserToBeCreated = {
    id: '6',
    login: 'johndoe1628',
    password: 'Johndoe1628',
    age: 20,
    isDeleted: false
};

const mockUserToBeUpdated = {
    id: '6',
    login: 'johndoe1628',
    password: 'Johndoe1628',
    age: 25,
    isDeleted: false
};

describe('User test suite', () => {
    it('tests /destinations endpoints without login', async () => {
        let response = await request(app).get('/users');
        expect(response.statusCode).toBe(401);
        expect(response.body.message).toBe('No token provided.');
        response = await request(app).get('/users/1');
        expect(response.statusCode).toBe(401);
        expect(response.body.message).toBe('No token provided.');
        response = await request(app).post('/users').send(mockUserToBeCreated);
        expect(response.statusCode).toBe(401);
        expect(response.body.message).toBe('No token provided.');
        response = await request(app).put('/users/6').send(mockUserToBeUpdated);
        expect(response.statusCode).toBe(401);
        expect(response.body.message).toBe('No token provided.');
        response = await request(app).delete('/users/6');
        expect(response.statusCode).toBe(401);
        expect(response.body.message).toBe('No token provided.');
    });

    it('tests /destinations endpoints login with wrong token', async () => {
        let response = await request(app)
            .get('/users')
            .set('x-access-token', 'random-token');
        expect(response.statusCode).toBe(403);
        expect(response.body.message).toBe('Invalid Token');

        response = await request(app)
            .get('/users/1')
            .set('x-access-token', 'random-token');
        expect(response.statusCode).toBe(403);
        expect(response.body.message).toBe('Invalid Token');

        response = await request(app)
            .post('/users')
            .set('x-access-token', 'random-token')
            .send(mockUserToBeCreated);
        expect(response.statusCode).toBe(403);
        expect(response.body.message).toBe('Invalid Token');

        response = await request(app)
            .put('/users/6')
            .set('x-access-token', 'random-token')
            .send(mockUserToBeUpdated);
        expect(response.statusCode).toBe(403);
        expect(response.body.message).toBe('Invalid Token');

        response = await request(app)
            .delete('/users/6')
            .set('x-access-token', 'random-token');
        expect(response.statusCode).toBe(403);
        expect(response.body.message).toBe('Invalid Token');
    });

    it('tests /destinations endpoints with login', async () => {
        const loginResponse = await request(app).post('/auth/login').send({
            login: 'vinhphu1628',
            password: 'Vinhphu1628'
        });
        expect(loginResponse.body.token).toBeDefined();

        let response = await request(app)
            .get('/users')
            .set('x-access-token', loginResponse.body.token);
        expect(response.statusCode).toBe(200);
        expect(
            response.body[0].id !== undefined || response.body === []
        ).toBeTruthy();

        response = await request(app)
            .get('/users/1')
            .set('x-access-token', loginResponse.body.token);
        expect(response.statusCode).toBe(200);
        expect(response.body.id !== undefined || response.body === []).toBeTruthy();

        response = await request(app)
            .post('/users')
            .set('x-access-token', loginResponse.body.token)
            .send(mockUserToBeCreated);
        expect(response.statusCode === 200 || response.statusCode === 500).toBeTruthy();
        if (response.statusCode === 200) {
            expect(response.text).toBe('Created user successfully!');
        }
        if (response.statusCode === 500) {
            expect(response.body.message).toBe('Validation error');
        }

        response = await request(app)
            .put('/users/6')
            .set('x-access-token', loginResponse.body.token)
            .send(mockUserToBeUpdated);
        expect(response.statusCode === 200 || response.statusCode === 500).toBeTruthy();
        if (response.statusCode === 200) {
            expect(response.text).toBe('Updated user successfully!');
        }
        if (response.statusCode === 500) {
            expect(response.body.message).toBe('Validation error');
        }

        response = await request(app)
            .delete('/users/6')
            .set('x-access-token', loginResponse.body.token);
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('Deleted user successfully!');
    });
});
