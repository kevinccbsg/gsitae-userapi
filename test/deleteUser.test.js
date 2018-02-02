const request = require('supertest');
// const chai = require('chai');
const app = require('../app');
const User = require('../models/User');

// const { expect } = chai;

const correctUser = {
  name: 'Kevin',
  surname: 'Martínez',
  code: '50002',
  email: 'kevintest@test.com',
};

let idUser = '';
describe('DELETE /user', () => {
  before(() => (
    User.remove({})
  ));

  it('Incorrect Request /notExists response 404', (done) => {
    request(app)
      .get('/notExists')
      .expect(404, done);
  });

  it('Post User Correctly status 201', (done) => {
    request(app)
      .post('/userapi/user')
      .send(correctUser)
      .expect(201)
      .then((response) => {
        idUser = response.body.code;
        done();
      });
  });

  it('Deleting User Error not found status 404', (done) => {
    request(app)
      .delete('/userapi/user/5001')
      .expect(404, done);
  });

  it('Deleting User status 204', (done) => {
    request(app)
      .delete(`/userapi/user/${idUser}`)
      .expect(204, done);
  });

  after(() => (
    User.remove({})
  ));
});
