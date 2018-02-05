const request = require('supertest');
const chai = require('chai');
const app = require('../app');
const User = require('../models/User');

const { expect } = chai;

const correctUser = {
  name: 'Kevin',
  surname: 'Martínez',
  code: '50002',
  email: 'kevintest@test.com',
};

const correctSecondUser = {
  name: 'Julian',
  surname: 'Escobar',
  code: '50003',
  email: 'kevintest@test.com',
};


describe('GET /users', () => {
  before(() => (
    User.remove({})
  ));

  it('Post User Correctly status 201', (done) => {
    request(app)
      .post('/userapi/user')
      .send(correctUser)
      .expect(201, done);
  });

  it('Post Second User Correctly status 201', (done) => {
    request(app)
      .post('/userapi/user')
      .send(correctSecondUser)
      .expect(201, done);
  });

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
        expect(response.body.users.length).to.equal(2);
      })
  ));

  after(() => (
    User.remove({})
  ));
});
