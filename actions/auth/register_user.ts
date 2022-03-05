import { IAuthRequest } from "../../definitions";
import { auth } from "../../utils/middlewares/auth"
import { validateParallel } from "../../utils/middlewares/validate"
var { body, check } = require("express-validator");
import express from "express";
import User from "../../models/user";
import bcrypt from "bcrypt"
import createError from "http-errors"

var encryption_rounds: number = parseInt(process.env.ENCRYTION_ROUNDS as string)

const REGISTER_USER_ACTION: CallableFunction[]  = [

    // auth,

    validateParallel([
            body('email').trim().isEmail().withMessage('Invalid E-mail address').bail().custom(checkEmailExists),
            body('password').trim().isLength({ min: 5 }).withMessage('Password too short'),
            check('confirm_password').trim().custom(confirmPassword),
            body('first_name').trim().notEmpty(),
            body('last_name').trim().notEmpty(),
    ]),

    async function (req:IAuthRequest, res: express.Response, next: express.NextFunction){
         
        try {
            let hash =  await bcrypt.hash(req.body.password, encryption_rounds)
            let newUser = User.build({
                email: req.body.email,
                password: hash,
                first_name: req.body.first_name,
                last_name: req.body.last_name,

            });

            newUser = await newUser.save()

            res.status(200).json({ user_id : newUser.id })

        } catch (error) {
            
            console.log(error)
            next(createError(400, "Unable to register user"))
        }         
    }
];


function checkEmailExists(email: string){
     let user = User.findOne({
         where: {
             email: email
         }
     })

     if (user == null){
        throw new Error('User already exists.')
     }else {
         return true;
     }

}

function confirmPassword(value: string, req: IAuthRequest) {
    if (value.trim() !== req.body.password) {
        throw new Error('Password mismatch!')
    }
    //sync validators require to return true
    return true;
}

export default REGISTER_USER_ACTION