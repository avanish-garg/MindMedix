// backend/test/api.test.js
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');  // Adjust to your server file
const should = chai.should();

chai.use(chaiHttp);

describe('Progress API', () => {
  it('should create a new progress entry', (done) => {
    const progress = {
      task: "Complete API Documentation",
      completionStatus: false,
      notes: "Pending"
    };
    chai.request(server)
      .post('/api/progress')
      .set('Authorization', `Bearer <your-jwt-token-here>`)
      .send(progress)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body[0].should.have.property('task').eql('Complete API Documentation');
        done();
      });
  });
});
