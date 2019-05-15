const assert = require('assert');
const expect = require('chai').expect;
const request = require('supertest');
const dotenv = require('dotenv')
const app = require('../index');

// describe('users',function(done){

//     it('loads the home page',function(){
//         request(index).get('/').expect(200).end(done)
//     })

// })

describe('Unit testing the /home route', function() {

    it('should return OK status', function() {
        return request(app)
            .get('/home')
            .then(function(response){
                assert.equal(response.status, 200)
            })
    });

});