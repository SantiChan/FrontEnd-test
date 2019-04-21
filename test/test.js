const expect = require('chai').expect;
const fetch  = require('node-fetch');
 
/* tesntin call to github API and some data*/

const api = 'https://api.github.com/users';

describe('API REST', function () {
  it('It must return a JSON object', async () => {
    var response = await fetch(api);
    expect(response.status).to.be.equal(200);
    var user = await response.json();
    expect(user).to.be.an('Array');
    user.map(data => {
        expect(data.login).to.be.a('String');
        expect(data.id).to.be.a('Number');
    })
  });
});

