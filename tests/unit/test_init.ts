import { castToType } from "../../definitions";
import assert from "assert";

// var chai = require('chai')
// var chaiHttp = require('chai-http')


describe('Array', function () {
  describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });

    it("should hide password",function () {
        
             interface UserSchema {
                first_name: string;
                last_name: string;
                phone: string

             }

             let user = {
                first_name: "Chinedu",
                last_name: "Dim",
                phone: "029302302030",
                password: "aefefewfew"
             }

             let userJson: UserSchema =  castToType<UserSchema>(user)

             console.log(userJson)

             console.log(Object.keys(userJson))

             assert.notEqual(1,2)
    })
  });
});