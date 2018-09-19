const assert = require('assert')
const should = require('should')
const request = require('supertest')
const app = require('../../app.js')

const postData = {
  privilege: 'test',
  uid: 'test',
  name: 'testUser'
}

describe('POST /redis/login', () => {
  describe('성공', () => {
    it('로그인 성공판단',(done) => {
      request(app)
        .post('/redis/login').send(postData)
        .expect(200)
        .end(done)
    })
  })
})