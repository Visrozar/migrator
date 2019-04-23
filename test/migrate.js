const request = require('supertest');
const should = require("should");
const app = require('../index.js'); // Our app

describe('POST /migrate validation tests', function () {

    it('responds with json', function (done) {
        request(app)
            .post('/migrate')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(422)
            .end(function (err, res) {
                res.body.status.should.equal(422);
                res.body.message.should.equal("Database URI cannot be null");
                done();
            });
    });

    // empty value or key not present errors

    it('returns appropriate error when database URI is not sent', function (done) {
        
    });

    it('returns appropriate error when database name is not sent', function (done) {
        
    });

    it('returns appropriate error when collection name is not sent', function (done) {
        
    });

    it('returns appropriate error when action is not sent', function (done) {
        
    });

    it('returns appropriate error when key name is not sent', function (done) {
        
    });

    it('returns appropriate error when value type is not sent', function (done) {
        
    });

    it('returns appropriate error when value is not sent', function (done) {
        
    });

    // not a string errors

    it('returns appropriate error when database uri is not a string', function (done) {
        
    });

    // unexpected format errors

    it('returns appropriate error when database uri is not in the expected format', function (done) {
        
    });
});