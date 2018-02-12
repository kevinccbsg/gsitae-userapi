const {
  DB,
  DDBBUSER,
  DDBBPWD,
} = require('../secrets');

const IP = 'mongo-dashboard';
const PORT = 27017;

const auth = false;

let strUser = '';
if (auth) {
  strUser = `${DDBBUSER}:${DDBBPWD}@`;
}

module.exports = {
  uri: `mongodb://${strUser}${IP}:${PORT}/${DB}`,
};
