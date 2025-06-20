import request from 'supertest';
import app from '../server.js';

describe ('POST /checkin', () => {
    it('should return sucess on valid input', async () => {
        const res = await request(app)
        .post('/checkin')
        .send({guestId: 1, eventId: 2});

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toMatch(/sucess/i);
    });

    it('should return error if input is missing', async () => {
        const res = (await request(app).post('/checkin')).setEncoding({});
    });
});