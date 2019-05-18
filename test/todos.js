let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);

describe('/POST todo', () => {
    it('should POST a new todo', (done) => {
        let todo = {
            'title' : 'test'
        };

        chai.request(server)
            .post('/todos/create')
            .send(todo)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.msg.should.be.eql('success');
                res.body.should.have.property('link');
                done();
            })
    });
});