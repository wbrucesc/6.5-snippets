const app = require('./index');
const request = require('supertest');

describe("GET '/add' ", function(){
  test("should return successfully", function(){
    return request(app)
      .get('/add')
      .then(function(response){
        expect(response.statusCode).toBe(302);
      });
  });
});
