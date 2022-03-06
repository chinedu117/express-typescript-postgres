import express from "express"
import LOGIN_USER_ACTION from "../actions/auth/login_user";
import REGISTER_USER_ACTION from "../actions/auth/register_user";

var router = express.Router();

/* GET home page. */

router.post('/login', ...LOGIN_USER_ACTION);
router.post('/signup', ...REGISTER_USER_ACTION);


export default router