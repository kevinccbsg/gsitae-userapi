const request = require('supertest');
// const chai = require('chai');
const app = require('../app');
const User = require('../models/User');

// const { expect } = chai;

const errorUser = {
  name: 'KJ',
  surname: 'Cool',
};

const correctUser = {
  name: 'Kevin',
  surname: 'Martínez',
  code: '50002',
  email: 'kevintest@test.com',
};

describe('POST /user', () => {
  before(() => (
    User.remove({})
  ));

  it('Incorrect Request /notExists response 404', (done) => {
    request(app)
      .get('/notExists')
      .expect(404, done);
  });

  it('Incorrect Request. Code Required 400', (done) => {
    request(app)
      .post('/userapi/user')
      .send(errorUser)
      .expect(400, done);
  });

  it('Incorrect Request. Not Email Format Required 400', (done) => {
    const errorEmail = Object.assign({}, errorUser, {
      code: '5002',
      email: 'kj.com',
    });
    request(app)
      .post('/userapi/user')
      .send(errorEmail)
      .expect(400, done);
  });

  it('Post User Correctly status 201', (done) => {
    request(app)
      .post('/userapi/user')
      .send(correctUser)
      .expect(201, done);
  });

  it('Error User with same code status 409', (done) => {
    request(app)
      .post('/userapi/user')
      .send(correctUser)
      .expect(409, done);
  });

  after(() => (
    User.remove({})
  ));
});
