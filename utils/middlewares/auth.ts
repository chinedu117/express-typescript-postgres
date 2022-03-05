import User from "../../models/user"
import express from "express"
import { IAuthRequest } from "../../definitions"

const jwt = require('jsonwebtoken')
var createError = require('http-errors')

const secretKey = process.env.JWT_SECRET



var auth = (req: IAuthRequest,res: express.Response, next:express.NextFunction) => {
    
     const token  = req.headers.authorization
     if(!token) throw  createError(403, 'Please provide authorization token')
     else {
        jwt.verify(token.split(" ")[1], secretKey, (err: Error, value: any) => {
             if(err) throw  createError(403,'Unable to verify token')
             req.user = value.data
             next()
           
        })
     }
}

var generateToken = (user: User) => {
     return jwt.sign({ data: user },secretKey, { expiresIn: '24h' })
 }

export {auth, generateToken }