import { body } from "express-validator";
import User from "../../models/user";
import { validateParallel } from "../../utils/middlewares/validate";
import  bcrypt  from "bcrypt"
import createError from "http-errors"
import { generateToken } from "../../utils/middlewares/auth";

const LOGIN_USER_ACTION: any[] = [
    validateParallel([
        body('email').trim().notEmpty().isEmail().withMessage("Enter a valid email"),
        body("password").trim().notEmpty(),
    ]),

    async function (req: any, res: any, next: any) {

        try {
            let user = await User.findOne({
                where: {
                    email: req.body.email

                }
            });

            if (!user) {
                throw createError(400,"Incorrect username or password")
            } 

            let isCorrectPswd = await bcrypt.compare(req.body.password, user.password as string)

            if(!isCorrectPswd){

                throw createError(400,"Incorrect username or password")
            }

            
            let token: string = generateToken(user)

            res.status(200).json({ token })

        } catch (error) {

            next(error)
        }

    }
];

export default LOGIN_USER_ACTION