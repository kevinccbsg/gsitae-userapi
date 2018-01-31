const request = require('supertest');
const app = require('../app');

describe('GET /user', () => {
  it('respond with json', (done) => {
    request(app)
      .get('/user')
      .expect(404, done);
  });
});
