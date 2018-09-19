const assert = require('assert')
const should = require('should')
const request = require('supertest')
// const app = require('../routes/users')
const app = require('../../app.js')

/*
describe('GET /users', () => {
  it('배열을 반환한다', () => {
    // assert.equal(1,0)
    (1).should.equal(1)
  })
})
*/

describe('GET /users', () => {
  describe('성공', () => {
    it('배열을 반환한다', (done) => {
      request(app)
        .get('/users')
        .end((err, res) => {
          res.body.should.be.instanceOf(Array); //응답값이 배열인지 체크
          res.body.forEach(user => {
            user.should.have.property('name') //응답값의 키값이 `name`인지
          })
          done()
        })
    })
    it('최대 limit 갯수만큼 응답한다', done => {
      request(app)
        .get('/users?limit=2')
        .end((err, res) => {
          res.body.should.have.lengthOf(2)
          done()
        })
    })
  })

  describe('실패', () => {
    it('limit이 정수가 아니면 400을 응답한다', done => {
      request(app)
        .get('/users?limit=two')
        .expect(400)
        .end(done)
    })
  })
})

describe('GET /users/:id', () => {
  describe('성공', () => {
    it('유저 객체를 반환한다', done => {
      request(app)
        .get('/users/1')
        .end((err, res) => {
          res.body.should.have.property('id', 1)
          done()
        })
    })
  })
  describe('실패', () => {
    it('id가 숫자가 아닐경우 400 응답', (done) => {
      request(app)
        .get('/users/one')
        .expect(400)
        .end(done)
    })
    it('찾을수 없는 id일 경우 404 응답', (done) => {
      request(app)
        .get('/users/9')
        .expect(404)
        .end(done)
    })
  })
})

describe('DELETE /users/:id', () => {
  describe('성공', () => {
    it('204 응답', done => {
      request(app)
        .delete('/users/3')
        .expect(204)
        .end(done)
    })
  })
  describe('실패', () => {
    it('id가 숫자가 아닐경우 400', done => {
      request(app)
        .delete('/users/three')
        .expect(400)
        .end(done)
    })
  })
})

describe('POST /users', () => {
  describe('성공', () => {
    it('201 응답, 생성한 유저 객체를 응답', done => {
      request(app)
        .post('/users').send({name: 'Daniel'})
        .expect(201)
        .end((err, res) => {
          res.body.should.have.property('name', 'Daniel')
          done()
        })
    })
  })
  describe('실패', () => {
    it('name이 없으면 400 응답', done => {
      request(app)
        .post('/users').send({})
        .expect(400).end(done)
    })
    it('name이 중복이면 409 응답', done => {
      request(app)
        .post('/users').send({name: 'Alice'})
        .expect(409).end(done)
    })
  })
})