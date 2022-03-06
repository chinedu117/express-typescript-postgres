import { IAuthRequest } from "../../definitions";
import { auth } from "../../utils/middlewares/auth";
import express from "express"
import User from "../../models/user";

var GET_AUTH_USER: any[] = [
    auth,
    function (req:IAuthRequest, res: express.Response, next: express.NextFunction)
    {
         let user: User = req.user

         res.status(200).json({ user })

    }


]

export default GET_AUTH_USER