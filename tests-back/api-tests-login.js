const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('./server');
const db = require('./models');
const expect = chai.expect;

chai.use(chaiHttp);

let request;

it('should find all examples', function (done) {
  chai.request(server)
  db.User.bulkCreate([
    { username: 'Mandy', password: 'testing' },
    { username: 'Larry', password: 'hello' },
    { username: 'David', password: 'newtesting' },
    { username: 'Henry', password: 'password' }
  ]).then(function () {
    request.get('/api/users').end(function (err, res) {
      let responseStatus = res.status;
      let responseBody = res.body;

      expect(err).to.be.null;

      expect(responseStatus).to.equal(200);

      expect(responseBody)
        .to.be.an('array')
        .that.has.lengthOf(4);

      expect(responseBody[0])
        .to.be.an('object')
        .that.includes({ username: 'Mandy', password: 'testing' });

      expect(responseBody[1])
        .to.be.an('object')
        .that.includes({ username: 'Larry', password: 'hello' });

      expect(responseBody[2])
        .to.be.an('object')
        .that.includes({ username: 'David', password: 'newtesting' });

      expect(responseBody[3])
        .to.be.an('object')
        .that.includes({ username: 'Henry', password: 'password' });

      done();
    });
  });
});


it('should save an example', function (done) {
  chai.request(server)
  var reqBody = {
    username: 'Mary-Smith',
    password: 'goldenarray'
  };

  request
    .post('/api/user')
    .send(reqBody)
    .end(function (err, res) {
      var responseStatus = res.status;
      var responseBody = res.body;

      expect(err).to.be.null;

      expect(responseStatus).to.equal(200);

      expect(responseBody)
        .to.be.an('object')
        .that.includes(reqBody);

      done();
    });
});