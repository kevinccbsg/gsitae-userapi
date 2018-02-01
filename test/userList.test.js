const request = require('supertest');
const chai = require('chai');
const app = require('../app');

const { expect } = chai;

describe('GET /users', () => {
  it('Incorrect Request /notExists response 404', (done) => {
    request(app)
      .get('/notExists')
      .expect(404, done);
  });

  it('Get Users Correctly status 200', () => (
    request(app)
      .get('/userapi/users')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.users, []);
      })
  ));
});
