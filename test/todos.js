let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();
let expect = require('chai').expect;

chai.use(chaiHttp);

let todo = {};

describe('/POST todo', () => {
    it('should POST a new todo', (done) => {
        let newTodo = {
            'title' : 'test'
        };

        chai.request(server)
            .post('/todos/create')
            .send(newTodo)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.msg.should.be.eql('success');
                res.body.should.have.property('link');
                todo._id = res.body.link;
                done();
            })
    });
});

describe('/GET todo', () => {
    it('should GET the requested todo', (done) => {

        chai.request(server)
            .get('/todos/' + todo._id)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('title');
                res.body.should.have.property('timeStamp');
                res.body.should.have.property('done');
                todo = res.body;
                done();
            })
    });
});


describe('/GET all todos', () => {
    it('should GET all the todos', (done) => {

        chai.request(server)
            .get('/todos')
            .end((err, res) => {
                res.should.have.status(200);
                expect(res.body).to.deep.include(todo);
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
                expect(res.body).to.deep.include(todo);
                done();
            })
    });
});

describe('/UPDATE todo', () => {
    it('should UPDATE the requested todo', (done) => {
        todo.done = true;

        chai.request(server)
            .post('/todos/' + todo._id)
            .send(todo)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.msg.should.be.eql('success');
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
                expect(res.body).to.deep.include(todo);
                done();
            })
    });
});

describe('/DELETE todo', () => {
    it('should DELETE the requested todo', (done) => {

        chai.request(server)
            .delete('/todos/' + todo._id)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.msg.should.be.eql('success');
                done();
            })
    });
});