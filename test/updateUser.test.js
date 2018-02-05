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

const updateErrorMailPayload = {
  email: 'nomail',
};

const updatePayload = {
  email: 'kevin123@gmail.com',
  roles: [{
    name: 'ADMIN',
    description: 'Administrador',
  }],
};

let idUser = '';
describe('PATCH /user', () => {
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

  it('Patch User Error not found status 404', (done) => {
    request(app)
      .patch('/userapi/user/5001')
      .expect(404, done);
  });

  it('Patch User Error email format status 400', () => (
    request(app)
      .patch(`/userapi/user/${idUser}`)
      .send(updateErrorMailPayload)
      .expect(400)
  ));

  it('Patch User status 200', () => (
    request(app)
      .patch(`/userapi/user/${idUser}`)
      .send(updatePayload)
      .expect(200)
  ));

  it('Get User Updated status 200', () => (
    request(app)
      .get(`/userapi/user/${idUser}`)
      .expect(200)
      .then((response) => {
        expect(response.body.email).to.equal(updatePayload.email);
        expect(response.body.roles).to.be.an('array');
      })
  ));
  after(() => (
    User.remove({})
  ));
});
