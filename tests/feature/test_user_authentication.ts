
var chai = require('chai')
var chaiHttp = require('chai-http')
import app from "../../index"

var faker = require('faker')

chai.use(chaiHttp)
chai.should()

describe("JWT AUTHENTICATION", () => {
    var token;
    var user;
    var password = '12345678'

    describe('USER SIGNUP', () => {
        it('should create a new user', (done) => {
            let signup = {
                name: faker.name.findName(),
                email: faker.internet.email(),
                password: password,
                confirm_password: password,
                city: faker.address.cityName(),
                address: faker.address.streetAddress()
            }

            chai.request(app)
                .post('/api/auth/signup')
                .type('form')
                .send(signup)
                .end((err, res) => {
                   
                    user = res.body.user
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });

        })

        it('should login user successfully', (done) => {
            var login = {
                email: user.email,
                password: password
            }
            chai.request(app)
                .post(`/api/auth/login`)
                .send(login)
                .end((err, res) => {
                    // console.log(res)
                    token = `Bearer ${res.body.token}`
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });

        })

    })

    describe("Protected Route", () => {

        it("should be unaccessible without authentication", (done) => {

            chai.request(app)
                .get('/api/auth/jwt-test')
                .end((err, res) => {
                    res.should.have.status(403);
                    res.body.should.be.a('object');
                    done();
                });

        });


        it("can be accessed with authentication token", (done) => {
        
            chai.request(app)
                .get('/api/auth/jwt-test')
                .set('Authorization',token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });

        });

    });



});