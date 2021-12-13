import request from 'supertest';
import app from '../app';

const mockGroupToBeCreated = {
    'id': '4',
    'name': 'banned',
    'permissions': []
};

const mockGroupToBeUpdated = {
    'id': '4',
    'name': 'bannedUsers',
    'permissions': []
};

describe('Group test suite', () => {
    it('tests /destinations endpoints without login', async () => {
        let response = await request(app).get('/groups');
        expect(response.statusCode).toBe(401);
        expect(response.body.message).toBe('No token provided.');
        response = await request(app).get('/groups/1');
        expect(response.statusCode).toBe(401);
        expect(response.body.message).toBe('No token provided.');
        response = await request(app).post('/groups').send(mockGroupToBeCreated);
        expect(response.statusCode).toBe(401);
        expect(response.body.message).toBe('No token provided.');
        response = await request(app).put('/groups/4').send(mockGroupToBeUpdated);
        expect(response.statusCode).toBe(401);
        expect(response.body.message).toBe('No token provided.');
        response = await request(app).delete('/groups/3');
        expect(response.statusCode).toBe(401);
        expect(response.body.message).toBe('No token provided.');
    });

    it('tests /destinations endpoints login with wrong token', async () => {
        let response = await request(app)
            .get('/groups')
            .set('x-access-token', 'random-token');
        expect(response.statusCode).toBe(403);
        expect(response.body.message).toBe('Invalid Token');

        response = await request(app)
            .get('/groups/1')
            .set('x-access-token', 'random-token');
        expect(response.statusCode).toBe(403);
        expect(response.body.message).toBe('Invalid Token');

        response = await request(app)
            .post('/groups')
            .set('x-access-token', 'random-token')
            .send(mockGroupToBeCreated);
        expect(response.statusCode).toBe(403);
        expect(response.body.message).toBe('Invalid Token');

        response = await request(app)
            .put('/groups/4')
            .set('x-access-token', 'random-token')
            .send(mockGroupToBeUpdated);
        expect(response.statusCode).toBe(403);
        expect(response.body.message).toBe('Invalid Token');

        response = await request(app)
            .delete('/groups/3')
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
            .get('/groups')
            .set('x-access-token', loginResponse.body.token);
        expect(response.statusCode).toBe(200);
        expect(
            response.body[0].id !== undefined || response.body === []
        ).toBeTruthy();

        response = await request(app)
            .get('/groups/1')
            .set('x-access-token', loginResponse.body.token);
        expect(response.statusCode).toBe(200);
        expect(response.body.id !== undefined || response.body === []).toBeTruthy();

        response = await request(app)
            .post('/groups')
            .set('x-access-token', loginResponse.body.token)
            .send(mockGroupToBeCreated);
        expect(response.statusCode === 200 || response.statusCode === 500).toBeTruthy();
        if (response.statusCode === 200) {
            expect(response.text).toBe('Created group successfully!');
        }
        if (response.statusCode === 500) {
            expect(response.body.message).toBe('Validation error');
        }

        response = await request(app)
            .put('/groups/4')
            .set('x-access-token', loginResponse.body.token)
            .send(mockGroupToBeUpdated);
        expect(response.statusCode === 200 || response.statusCode === 500).toBeTruthy();
        if (response.statusCode === 200) {
            expect(response.text).toBe('Updated group successfully!');
        }
        if (response.statusCode === 500) {
            expect(response.body.message).toBe('Validation error');
        }

        response = await request(app)
            .delete('/groups/3')
            .set('x-access-token', loginResponse.body.token);
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('Deleted group successfully!');
    },);
});
