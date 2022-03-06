
var chai = require('chai')
var chaiHttp = require('chai-http')
import app from "../../index"
import { faker } from "@faker-js/faker"

chai.use(chaiHttp)
chai.should()

describe("USER AUTHENTICATION SYSTEM", () => {
 
    describe('auth/signup', () => {
        it('should create a new user', (done) => {
            let password: string = "12345667"
            let signup = {
                first_name: faker.name.firstName(),
                last_name: faker.name.lastName(),
                email: faker.internet.email(),
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

        

    })



});