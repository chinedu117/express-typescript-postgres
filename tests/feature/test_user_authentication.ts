
var chai = require('chai')
var chaiHttp = require('chai-http')
import app from "../../index"
import { faker } from "@faker-js/faker"
import User from "../../models/user"

chai.use(chaiHttp)
chai.should()

describe("USER AUTHENTICATION SYSTEM", () => {
    var email: string = faker.internet.email()
    var password: string = "12345667"
    var token: string;

    describe('auth/signup', () => {
        it('should create a new user', (done) => {
           
            let signup = {
                first_name: faker.name.firstName(),
                last_name: faker.name.lastName(),
                email: email,
                password: password,
                confirm_password: password,
            }

            console.log(signup)
            
            chai.request(app)
                .post('/api/v1/auth/signup')
                .type('json')
                .send(signup)
                .end((err: any, res: any) => {
                    console.log(err)
                    console.log(res.body)
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property("user_id")
                    done();
                });

        })


        it("should fail if email already exists", (done) => {
            let password: string = "12345667"
            let signup = {
                first_name: faker.name.firstName(),
                last_name: faker.name.lastName(),
                email: faker.internet.email(),
                password: password,
                confirm_password: password,
            }

            User.create(signup)

            chai.request(app)
                .post('/api/v1/auth/signup')
                .type('json')
                .send(signup)
                .end((err: any, res: any) => {
                    console.log(err)
                    console.log(res.body)
                    res.should.have.status(422);
                    res.body.should.be.a('object');
                    res.body.should.have.property("errors")
                    res.body.errors.should.be.a("array")

                    done();
                });
             
        })

        

    })

    describe("auth/login", () => {
         
        it("should login registered user", (done) => {
             
             let payload = {
                  "email": email,
                  "password":password
             }

             chai.request(app)
                .post('/api/v1/auth/login')
                .type("json")
                .send(payload)
                .end((err: any, res: any) => {
                    // console.log(res)
                    res.should.have.status(200)
                    res.body.should.be.a("object")
                    res.body.should.have.property("token")
                    // console.log(res.body.token)
                    token = `Bearer ${res.body.token}`  
                    done()
                })

        })


        it("should not allow incorrect password", (done) => {
             
            let payload = {
                 "email": email,
                 "password":"incorrect_pass"
            }

            chai.request(app)
               .post('/api/v1/auth/login')
               .type("json")
               .send(payload)
               .end((err: any, res: any) => {
                   console.log(res.body)
                   res.should.have.status(400)
                   res.body.should.be.a("object")
                   res.body.should.have.property("message")
                   res.body.message.should.be.eq("Incorrect username or password")

                   // console.log(res.body.token)
                   done()
               })

       })
    })


    describe("auth/user ", () => {
         
        it("should retrieve current user", (done) => {

            chai.request(app)
            .get('/api/v1/auth/user')
            .set("Authorization", token)
            .end((err: any, res: any) => {
                console.log(res.body)
                res.should.have.status(200)
                res.body.should.be.a("object")
                res.body.should.have.property("user")
                res.body.user.should.have.property("id")
                res.body.user.should.not.have.property("password")

                // console.log(res.body.token)
                done()
            })

        })
    })



});