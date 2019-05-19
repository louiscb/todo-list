let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);

let todoId;

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
                todoId = res.body.link;
                done();
            })
    });
});

describe('/GET todo', () => {
    it('should GET the requested todo', (done) => {

        chai.request(server)
            .get('/todos/' + todoId)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('title');
                res.body.should.have.property('timeStamp');
                res.body.should.have.property('done');
                done();
            })
    });
});


describe('/GET all todo', () => {
    it('should GET all the todos', (done) => {

        chai.request(server)
            .get('/todos')
            .end((err, res) => {
                res.should.have.status(200);
                res.body[0].should.have.property('title');
                res.body[0].should.have.property('timeStamp');
                res.body[0].should.have.property('done');
                done();
            })
    });
});

describe('/GET not done todos', () => {
    it('should GET all the not done todos', (done) => {

        chai.request(server)
            .get('/todos/not-done')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.deep.should.include({_id : todoId});
                done();
            })
    });
});

describe('/UPDATE todo', () => {
    it('should UPDATE the requested todo', (done) => {
        let todo = {
            'done' : true
        };

        chai.request(server)
            .post('/todos/' + todoId)
            .send(todo)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('title');
                res.body.should.have.property('timeStamp');
                res.body.should.have.property('done');
                done();
            })
    });
});

describe('/GET done todos', () => {
    it('should GET all the done todos', (done) => {

        chai.request(server)
            .get('/todos/done')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.deep.should.include({_id : 12});
                done();
            })
    });
});

describe('/DELETE todo', () => {
    it('should DELETE the requested todo', (done) => {

        chai.request(server)
            .delete('/todos/' + todoId)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.msg.should.be.eql('success');
                done();
            })
    });
});