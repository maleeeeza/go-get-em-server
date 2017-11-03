'use strict';
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const {app} = require('../index')

const {TEST_DATABASE_URL} = require('../config');
const {dbConnect, dbDisconnect} = require('../db-mongoose');


process.env.NODE_ENV = 'test';

process.stdout.write('\x1Bc\n');

const expect = chai.expect;
chai.use(chaiHttp);

before(function() {
    return dbConnect(TEST_DATABASE_URL);
});

after(function() {
    return dbDisconnect();
});


describe('Cats', function() {
  it('should list cats on GET', function() {
    return chai.request(app)
      .get('/api/cat')
      .then(function(res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        const expectedKeys = ['id', 'imageURL', 'name'];
      });
  });
});
